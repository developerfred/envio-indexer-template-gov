import {
  GovernanceContract_ProposalCanceled_handler,
  GovernanceContract_ProposalCreated_handler,
  GovernanceContract_ProposalExecuted_handler,
  GovernanceContract_ProposalQueued_handler,
  GovernanceContract_ProposalThresholdSet_handler,
  GovernanceContract_TimelockChange_handler,
  GovernanceContract_VoteCast_handler,
  GovernanceContract_VoteCastWithParams_handler,
  GovernanceContract_VotingDelaySet_handler,
  GovernanceContract_VotingPeriodSet_handler,
} from "../generated/src/Handlers.gen";

import {
  ProposalCanceledEntity,
  ProposalCreatedEntity,
  ProposalExecutedEntity,
  ProposalQueuedEntity,
  ProposalThresholdSetEntity,
  TimelockChangeEntity,
  VoteCastEntity,
  VoteCastWithParamsEntity,
  VotingDelaySetEntity,
  VotingPeriodSetEntity,
  ProposalEntity,
} from "./src/Types.gen";

GovernanceContract_ProposalCanceled_handler(({ event, context }) => {
  let proposalCanceledEntity: ProposalCanceledEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    proposalId: event.params.proposalId,
  };

  context.ProposalCanceled.set(proposalCanceledEntity);
});

GovernanceContract_ProposalCreated_handler(({ event, context }) => {
  let proposalCreatedEntity: ProposalCreatedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    proposalId: event.params.proposalId,
    proposer: event.params.proposer,
    targets: event.params.targets,
    values: event.params.values,
    signatures: event.params.signatures,
    calldatas: event.params.calldatas,
    startBlock: event.params.startBlock,
    endBlock: event.params.endBlock,
    description: event.params.description,
  };

  context.ProposalCreated.set(proposalCreatedEntity);
});




GovernanceContract_ProposalExecuted_handler(({ event, context }) => {
  let proposalExecutedEntity: ProposalExecutedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    proposalId: event.params.proposalId,
  };

  context.ProposalExecuted.set(proposalExecutedEntity);
});

GovernanceContract_ProposalQueued_handler(({ event, context }) => {
  let proposalQueuedEntity: ProposalQueuedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    proposalId: event.params.proposalId,
    eta: event.params.eta,
  };

  context.ProposalQueued.set(proposalQueuedEntity);
});

GovernanceContract_ProposalThresholdSet_handler(({ event, context }) => {
  let proposalThresholdSetEntity: ProposalThresholdSetEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    oldProposalThreshold: event.params.oldProposalThreshold,
    newProposalThreshold: event.params.newProposalThreshold,
  };

  context.ProposalThresholdSet.set(proposalThresholdSetEntity);
});

GovernanceContract_TimelockChange_handler(({ event, context }) => {
  let timelockChangeEntity: TimelockChangeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    oldTimelock: event.params.oldTimelock,
    newTimelock: event.params.newTimelock,
  };

  context.TimelockChange.set(timelockChangeEntity);
});



GovernanceContract_VoteCastWithParams_handler(({ event, context }) => {
  let supportValue = event.params.support === BigInt(1);
  let voteCastWithParamsEntity: VoteCastWithParamsEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    voter: event.params.voter,
    proposalId: event.params.proposalId,
    support: supportValue,
    weight: event.params.weight,
    reason: event.params.reason,
    params: event.params.params,
  };

  context.VoteCastWithParams.set(voteCastWithParamsEntity);
});

GovernanceContract_VotingDelaySet_handler(({ event, context }) => {
  let votingDelaySetEntity: VotingDelaySetEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    oldVotingDelay: event.params.oldVotingDelay,
    newVotingDelay: event.params.newVotingDelay,
  };

  context.VotingDelaySet.set(votingDelaySetEntity);
});

GovernanceContract_VotingPeriodSet_handler(({ event, context }) => {
  let votingPeriodSetEntity: VotingPeriodSetEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    oldVotingPeriod: event.params.oldVotingPeriod,
    newVotingPeriod: event.params.newVotingPeriod,
  };

  context.VotingPeriodSet.set(votingPeriodSetEntity);
});


