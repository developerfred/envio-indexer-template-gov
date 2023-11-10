 import {
  GovernanceContract_ProposalCanceled_loader,
  GovernanceContract_ProposalCanceled_handler,
  GovernanceContract_ProposalCreated_loader,
  GovernanceContract_ProposalCreated_handler,
  GovernanceContract_ProposalExecuted_loader,
  GovernanceContract_ProposalExecuted_handler,
  GovernanceContract_ProposalQueued_loader,
  GovernanceContract_ProposalQueued_handler,
  GovernanceContract_ProposalThresholdSet_loader,
  GovernanceContract_ProposalThresholdSet_handler,
  GovernanceContract_TimelockChange_loader,
  GovernanceContract_TimelockChange_handler,
  GovernanceContract_VoteCast_loader,
  GovernanceContract_VoteCast_handler,
  GovernanceContract_VoteCastWithParams_loader,
  GovernanceContract_VoteCastWithParams_handler,
  GovernanceContract_VotingDelaySet_loader,
  GovernanceContract_VotingDelaySet_handler,
  GovernanceContract_VotingPeriodSet_loader,
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
  EventsSummaryEntity
} from "./src/Types.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  proposalCanceledsCount: BigInt(0),
  proposalCreatedsCount: BigInt(0),
  proposalExecutedsCount: BigInt(0),
  proposalQueuedsCount: BigInt(0),
  proposalThresholdSetsCount: BigInt(0),
  timelockChangesCount: BigInt(0),
  voteCastsCount: BigInt(0),
  voteCastWithParamssCount: BigInt(0),
  votingDelaySetsCount: BigInt(0),
  votingPeriodSetsCount: BigInt(0),
};

GovernanceContract_ProposalCanceled_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

GovernanceContract_ProposalCanceled_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    proposalCanceledsCount: currentSummaryEntity.proposalCanceledsCount + BigInt(1),
  };

  let proposalCanceledEntity: ProposalCanceledEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    proposalId: event.params.proposalId,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.ProposalCanceled.set(proposalCanceledEntity);
});

GovernanceContract_ProposalCreated_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

GovernanceContract_ProposalCreated_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    proposalCreatedsCount: currentSummaryEntity.proposalCreatedsCount + BigInt(1),
  };

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
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    favorableVotesCount: 0n,
    totalVotesCount: 0n,
    currentState: ""
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.ProposalCreated.set(proposalCreatedEntity);
});

GovernanceContract_ProposalExecuted_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

GovernanceContract_ProposalExecuted_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    proposalExecutedsCount: currentSummaryEntity.proposalExecutedsCount + BigInt(1),
  };

  let proposalExecutedEntity: ProposalExecutedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    proposalId: event.params.proposalId,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.ProposalExecuted.set(proposalExecutedEntity);
});

GovernanceContract_ProposalQueued_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

GovernanceContract_ProposalQueued_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    proposalQueuedsCount: currentSummaryEntity.proposalQueuedsCount + BigInt(1),
  };

  let proposalQueuedEntity: ProposalQueuedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    proposalId: event.params.proposalId,
    eta: event.params.eta,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.ProposalQueued.set(proposalQueuedEntity);
});

GovernanceContract_ProposalThresholdSet_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

GovernanceContract_ProposalThresholdSet_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    proposalThresholdSetsCount: currentSummaryEntity.proposalThresholdSetsCount + BigInt(1),
  };

  let proposalThresholdSetEntity: ProposalThresholdSetEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    oldProposalThreshold: event.params.oldProposalThreshold,
    newProposalThreshold: event.params.newProposalThreshold,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.ProposalThresholdSet.set(proposalThresholdSetEntity);
});

GovernanceContract_TimelockChange_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

GovernanceContract_TimelockChange_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    timelockChangesCount: currentSummaryEntity.timelockChangesCount + BigInt(1),
  };

  let timelockChangeEntity: TimelockChangeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    oldTimelock: event.params.oldTimelock,
    newTimelock: event.params.newTimelock,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.TimelockChange.set(timelockChangeEntity);
});

GovernanceContract_VoteCast_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

GovernanceContract_VoteCast_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    voteCastsCount: currentSummaryEntity.voteCastsCount + BigInt(1),
  };

  let voteCastEntity: VoteCastEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    voter: event.params.voter,
    proposalId: event.params.proposalId,
    support: event.params.support,
    weight: event.params.weight,
    reason: event.params.reason,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,        
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.VoteCast.set(voteCastEntity);
});

GovernanceContract_VoteCastWithParams_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

GovernanceContract_VoteCastWithParams_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    voteCastWithParamssCount: currentSummaryEntity.voteCastWithParamssCount + BigInt(1),
  };

  let voteCastWithParamsEntity: VoteCastWithParamsEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    voter: event.params.voter,
    proposalId: event.params.proposalId,
    support: event.params.support,
    weight: event.params.weight,
    reason: event.params.reason,
    params: event.params.params,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.VoteCastWithParams.set(voteCastWithParamsEntity);
});

GovernanceContract_VotingDelaySet_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

GovernanceContract_VotingDelaySet_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    votingDelaySetsCount: currentSummaryEntity.votingDelaySetsCount + BigInt(1),
  };

  let votingDelaySetEntity: VotingDelaySetEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    oldVotingDelay: event.params.oldVotingDelay,
    newVotingDelay: event.params.newVotingDelay,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.VotingDelaySet.set(votingDelaySetEntity);
});

GovernanceContract_VotingPeriodSet_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

GovernanceContract_VotingPeriodSet_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    votingPeriodSetsCount: currentSummaryEntity.votingPeriodSetsCount + BigInt(1),
  };

  let votingPeriodSetEntity: VotingPeriodSetEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    oldVotingPeriod: event.params.oldVotingPeriod,
    newVotingPeriod: event.params.newVotingPeriod,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.VotingPeriodSet.set(votingPeriodSetEntity);
});

