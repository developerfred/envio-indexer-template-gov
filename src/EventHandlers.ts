import {
    GovernanceContractContract_ProposalCreated_loader,
    GovernanceContractContract_ProposalCreated_handler,
    GovernanceContractContract_ProposalExecuted_loader,
    GovernanceContractContract_ProposalExecuted_handler,
    GovernanceContractContract_ProposalCanceled_loader,
    GovernanceContractContract_ProposalCanceled_handler,
    GovernanceContractContract_VoteCast_loader,
    GovernanceContractContract_VoteCast_handler,
    GovernanceContractContract_VoteCastWithParams_loader,
    GovernanceContractContract_VoteCastWithParams_handler,
  } from "../generated/src/Handlers.gen";


  import {
    VoteEntity,
    ProposalEntity,
    ProposalOverviewEntity,
    VoterEntity,
  } from "./src/Types.gen";




  function updateVoteCounts(proposalId: string, support: number, context: any) {
    let proposal = context.ProposalEntity.get(proposalId);
    if (proposal) {
      proposal.voteCount = (proposal.voteCount || 0) + 1;
      switch (support) {
        case 1:
          proposal.inFavorCount = (proposal.inFavorCount || 0) + 1;
          break;
        case 0:
          proposal.againstCount = (proposal.againstCount || 0) + 1;
          break;
        case 2:
          proposal.abstainCount = (proposal.abstainCount || 0) + 1;
          break;
      }
      context.ProposalEntity.set(proposal);
    }
  }


  function createOrUpdateVoteEntity(event: any, context: any, withParams: boolean = false) {
    let voteId = withParams
      ? event.transactionHash.toHexString() + "-with-params"
      : event.transactionHash.toHexString();
  
    let vote = new VoteEntity(voteId);
    vote.voter = event.params.voter.toHexString();
    vote.proposalId = event.params.proposalId.toString();
    vote.support = event.params.support;
    vote.weight = event.params.weight.toString();
    vote.reason = event.params.reason;
    if (withParams) {
      vote.params = event.params.params.toHexString();
    }
    context.VoteEntity.set(vote);
    return vote;
  }

GovernanceContractContract_ProposalCreated_handler(({ event, context }) => {
    let proposalEntity = new ProposalEntity(event.params.proposalId.toString());
    proposalEntity.proposer = event.params.proposer.toHexString();
    proposalEntity.targets = event.params.targets.map((e) => e.toHexString());
    proposalEntity.values = event.params.values.map((e) => e.toString());
    proposalEntity.signatures = event.params.signatures;
    proposalEntity.calldatas = event.params.calldatas.map((e) => e.toHexString());
    proposalEntity.voteStart = event.params.voteStart.toString();
    proposalEntity.voteEnd = event.params.voteEnd.toString();
    proposalEntity.description = event.params.description;
    proposalEntity.status = "Active";
    proposalEntity.votes = [];
    proposalEntity.voteCount = 0;
    proposalEntity.inFavorCount = 0;
    proposalEntity.againstCount = 0;
    proposalEntity.abstainCount = 0;
    context.ProposalEntity.set(proposalEntity);
  });
  
  
  GovernanceContractContract_ProposalExecuted_handler(({ event, context }) => {
    let proposal = context.ProposalEntity.get(event.params.proposalId.toString());
    if (proposal) {
      proposal.status = "Executed";
      context.ProposalEntity.set(proposal);
    }
  });
  
  
  GovernanceContractContract_ProposalCanceled_handler(({ event, context }) => {
    let proposal = context.ProposalEntity.get(event.params.proposalId.toString());
    if (proposal) {
      proposal.status = "Canceled";
      context.ProposalEntity.set(proposal);
    }
  });
  
  
  GovernanceContractContract_VoteCast_handler(({ event, context }) => {
    let vote = createOrUpdateVoteEntity(event, context);
    updateVoteCounts(vote.proposalId, vote.support, context);
  });
  
  
  GovernanceContractContract_VoteCastWithParams_handler(({ event, context }) => {
    let vote = createOrUpdateVoteEntity(event, context, true);
    updateVoteCounts(vote.proposalId, vote.support, context);
  });
  