
# Indexer On-Chain Governance Template

## Description
This template provides a basic framework for implementing an on-chain governance indexer. It's configured to listen to specific governance events in smart contracts on blockchain networks and index these events for easier querying and analysis.

## Features
- Multi-blockchain network configuration
- Support for common governance events
- Easy to extend and customize

## Initial Setup
Before starting, ensure you have the necessary tools installed, including Node.js, npm/yarn, and Git.

### Setup Steps
1. **Clone the Repository**: 
   ```
   git clone [https://github.com/developerfred/envio-indexer-template-gov]
   cd indexer-on-chain-governance
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Environment Setup**:
   - Copy the `.env.example` file to `.env`.
   - Fill in the required environment variables in the `.env` file.

## Project Configuration
This template is pre-configured to listen for governance events on specific contracts. You can modify these settings in the network configuration file.

### Network Configuration Structure
- **id**: Identifier of the blockchain network chain.
- **rpc_config**: RPC access point configuration.
- **start_block**: Initial block from which the indexer starts listening to events.
- **contracts**: List of contracts and events to be monitored.

### Configuration Example

```yaml
networks:
  - id: 1
    rpc_config:
      url: https://eth.llamarpc.com
    start_block: 12422079
    contracts:
      - name: Governance
        abi_file_path: abis/GovernanceContract.json
        address:
          - 0x9d4c63565d5618310271bf3f3c01b2954c1d1639
        handler: src/EventHandlers.ts
        events:
          - event: ProposalCanceled(uint256 proposalId)
            requiredEntities:
              - name: EventsSummary
          # ... [more events]
```

## Usage
To start the indexer, run the following command:
```
npm start
```
This will initiate the process of listening to the configured events and index them as defined in the event handlers.

## Customization
You can customize this template by adding new events or modifying existing event handlers as needed. The event handlers are defined in `src/EventHandlers.ts`.

