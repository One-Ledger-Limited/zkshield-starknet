// ShieldTrade Registry — on-chain community blacklist
// Starknet Re{define} Hackathon — Wildcard Track
// Anyone can flag a risky address; only the owner can clear flags.

use starknet::ContractAddress;

// ─── Interface ───────────────────────────────────────────────────────────────

#[starknet::interface]
trait IShieldRegistry<TContractState> {
    /// Flag an address as risky. Anyone can call this.
    /// `reason` is a short felt252 label, e.g. 'scam', 'phishing', 'rug'
    fn flag_address(ref self: TContractState, address: ContractAddress, reason: felt252);

    /// Remove a flag. Only the contract owner can call this.
    fn clear_flag(ref self: TContractState, address: ContractAddress);

    /// Returns true if the address is currently flagged.
    fn is_flagged(self: @TContractState, address: ContractAddress) -> bool;

    /// Returns the most recent reason the address was flagged.
    fn get_flag_reason(self: @TContractState, address: ContractAddress) -> felt252;

    /// Returns how many times this address has been flagged (cumulative).
    fn get_flag_count(self: @TContractState, address: ContractAddress) -> u32;

    /// Returns total number of currently-active flagged addresses.
    fn get_total_flagged(self: @TContractState) -> u64;

    /// Returns the contract owner address.
    fn get_owner(self: @TContractState) -> ContractAddress;

    /// Transfer ownership to a new address.
    fn transfer_ownership(ref self: TContractState, new_owner: ContractAddress);
}

// ─── Contract ────────────────────────────────────────────────────────────────

#[starknet::contract]
mod ShieldRegistry {
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use starknet::storage::{
        Map,
        StorageMapReadAccess,
        StorageMapWriteAccess,
        StoragePointerReadAccess,
        StoragePointerWriteAccess,
    };

    #[storage]
    struct Storage {
        /// Contract owner — the only account that can clear flags
        owner: ContractAddress,
        /// address → currently flagged?
        flagged: Map<ContractAddress, bool>,
        /// address → most-recent flag reason (short felt252 string)
        flag_reason: Map<ContractAddress, felt252>,
        /// address → cumulative flag-submission count
        flag_count: Map<ContractAddress, u32>,
        /// count of currently active (non-cleared) flagged addresses
        total_flagged: u64,
    }

    // ─── Events ──────────────────────────────────────────────────────────────

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        AddressFlagged: AddressFlagged,
        AddressCleared: AddressCleared,
        OwnershipTransferred: OwnershipTransferred,
    }

    #[derive(Drop, starknet::Event)]
    struct AddressFlagged {
        #[key]
        address: ContractAddress,
        reason: felt252,
        #[key]
        flagged_by: ContractAddress,
        timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct AddressCleared {
        #[key]
        address: ContractAddress,
        cleared_by: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct OwnershipTransferred {
        previous_owner: ContractAddress,
        new_owner: ContractAddress,
    }

    // ─── Constructor ─────────────────────────────────────────────────────────

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.owner.write(owner);
        self.total_flagged.write(0);
    }

    // ─── Implementation ──────────────────────────────────────────────────────

    #[abi(embed_v0)]
    impl ShieldRegistryImpl of super::IShieldRegistry<ContractState> {
        fn flag_address(ref self: ContractState, address: ContractAddress, reason: felt252) {
            let caller = get_caller_address();
            let timestamp = get_block_timestamp();

            // Track if this is a newly-flagged address (vs re-flagged)
            let was_flagged = self.flagged.read(address);
            self.flagged.write(address, true);
            self.flag_reason.write(address, reason);

            // Increment cumulative counter
            let count = self.flag_count.read(address);
            self.flag_count.write(address, count + 1);

            // Only bump total_flagged when going from clean → flagged
            if !was_flagged {
                let total = self.total_flagged.read();
                self.total_flagged.write(total + 1);
            }

            self.emit(AddressFlagged { address, reason, flagged_by: caller, timestamp });
        }

        fn clear_flag(ref self: ContractState, address: ContractAddress) {
            let caller = get_caller_address();
            assert(caller == self.owner.read(), 'Only owner can clear flags');

            let was_flagged = self.flagged.read(address);
            if was_flagged {
                let total = self.total_flagged.read();
                self.total_flagged.write(total - 1);
            }

            self.flagged.write(address, false);
            self.flag_reason.write(address, 0);

            self.emit(AddressCleared { address, cleared_by: caller });
        }

        fn is_flagged(self: @ContractState, address: ContractAddress) -> bool {
            self.flagged.read(address)
        }

        fn get_flag_reason(self: @ContractState, address: ContractAddress) -> felt252 {
            self.flag_reason.read(address)
        }

        fn get_flag_count(self: @ContractState, address: ContractAddress) -> u32 {
            self.flag_count.read(address)
        }

        fn get_total_flagged(self: @ContractState) -> u64 {
            self.total_flagged.read()
        }

        fn get_owner(self: @ContractState) -> ContractAddress {
            self.owner.read()
        }

        fn transfer_ownership(ref self: ContractState, new_owner: ContractAddress) {
            let caller = get_caller_address();
            let previous_owner = self.owner.read();
            assert(caller == previous_owner, 'Only owner');
            self.owner.write(new_owner);
            self.emit(OwnershipTransferred { previous_owner, new_owner });
        }
    }
}
