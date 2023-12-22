import {
  GovernanceContract_ProposalCanceled_handler,
  GovernanceContract_ProposalCreated_handler,
  GovernanceContract_ProposalExecuted_handler,
  GovernanceContract_ProposalQueued_handler,  
  GovernanceContract_VoteCast_handler,
  GovernanceContract_VoteCastWithParams_handler,
  GovTokenContract_DelegateChanged_handler,
  GovTokenContract_DelegateVotesChanged_handler,
} from "../generated/src/Handlers.gen";

import { getDaoNameByContractAddress, getProposalId } from './helpers';


GovernanceContract_ProposalCreated_handler(({ event, context }) => {
  let daoName = getDaoNameByContractAddress(event.srcAddress);
  let proposalId = getProposalId(daoName, event.params.proposalId);
  
  let newProposal = {
    id: proposalId,
    status: "Created",
    description: event.params.description,
    proposer: event.params.proposer,
    votes: [],
    organization: daoName,
    timestamp: BigInt(event.blockTimestamp),
    startDate: event.params.startBlock,
    endDate: event.params.endBlock
  };

  context.Proposal.set(newProposal);
});


GovernanceContract_ProposalCanceled_handler(({ event, context }) => {
  let daoName = getDaoNameByContractAddress(event.srcAddress);
  let proposalId = getProposalId(daoName, event.params.proposalId);
  let existingProposal = context.Proposal.get(proposalId);
  if (existingProposal) {    
    let updatedProposal = {
      ...existingProposal, 
      status: "Canceled",    
    };

    context.Proposal.set(updatedProposal);
  }
});


GovernanceContract_ProposalExecuted_handler(({ event, context }) => {
  let daoName = getDaoNameByContractAddress(event.srcAddress);
  let proposalId = getProposalId(daoName, event.params.proposalId);

  let existingProposal = context.Proposal.get(proposalId);
  if (existingProposal) {
    let updatedProposal = {
      ...existingProposal,
      status: "Executed",      
    };

    context.Proposal.set(updatedProposal);
  }
});



GovernanceContract_ProposalQueued_handler(({ event, context }) => {
  let daoName = getDaoNameByContractAddress(event.srcAddress);
  let proposalId = getProposalId(daoName, event.params.proposalId);
  let existingProposal = context.Proposal.get(proposalId);
  if (existingProposal) {    
    let updatedProposal = {
      ...existingProposal, 
      status: "Queued",    
    };

    context.Proposal.set(updatedProposal);
  }
});

GovernanceContract_VoteCast_handler(({ event, context }) => {
  let daoName = getDaoNameByContractAddress(event.srcAddress);
  let proposalIdBigInt = BigInt(event.params.proposalId);
  let proposalId = getProposalId(daoName, proposalIdBigInt);
  let voteId = `${proposalId}-${event.params.voter}`;
 
  let userId = event.params.voter;
  let user = context.User.get(userId);
  let updatedOrganizations;

  if (!user) {    
    updatedOrganizations = [daoName];
    user = {
      id: userId,
      organizations: updatedOrganizations,    
    };
  } else {    
    updatedOrganizations = user.organizations ? user.organizations.slice() : [];
    if (!updatedOrganizations.includes(daoName)) {
      updatedOrganizations.push(daoName);
    }
    
    user = {
      ...user,
      organizations: updatedOrganizations
    };
  }

  context.User.set(user);
  
  let newVote = {
    id: voteId,
    user: userId, 
    proposal: proposalId,
    support: Number(event.params.support), 
    weight: event.params.weight, 
    reason: event.params.reason,
    organization: daoName, 
    solution: BigInt(0), 
    timestamp: BigInt(event.blockTimestamp) 
  };

  context.Vote.set(newVote);
});

GovernanceContract_VoteCastWithParams_handler(({ event, context }) => {
  let daoName = getDaoNameByContractAddress(event.srcAddress);
  let proposalIdBigInt = BigInt(event.params.proposalId);
  let proposalId = getProposalId(daoName, proposalIdBigInt);
  let voteId = `${proposalId}-${event.params.voter}`;

  let userId = event.params.voter;
  let user = context.User.get(userId);
  let updatedOrganizations;

  if (!user) {

    updatedOrganizations = [daoName];
    user = {
      id: userId,
      organizations: updatedOrganizations,
      
    };
  } else {
   
    updatedOrganizations = user.organizations ? user.organizations.slice() : [];
    if (!updatedOrganizations.includes(daoName)) {
      updatedOrganizations.push(daoName);
    }

  
    user = {
      ...user,
      organizations: updatedOrganizations
    };
  }

  
  context.User.set(user);

  let newVote = {
    id: voteId,
    user: userId,
    proposal: proposalId,
    support: Number(event.params.support), 
    weight: event.params.weight,
    reason: event.params.reason,
    solution: BigInt(event.params.params), 
    organization: daoName,
    timestamp: BigInt(event.blockTimestamp)
  };

  context.Vote.set(newVote);
});


// Delegator Handlers