import React, { Fragment, Component } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Box } from '@makerdao/ui-components-core';
import Card from '../Card';
import closeImg from '../../imgs/close-inline.svg';
import CreatePollInput from './CreatePollInput';
import CreatePollTime from './CreatePollTime';
import { POLL_DEFAULT_START, URL_REGEX } from '../../utils/constants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProposal } from '../../actions/proposal';

import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const WarningText = styled.p`
  font-size: 0.9em;
  color: #f35833;
  margin-top: 11px;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 40px;
`;

const StyledBody = styled.p`
  width: 200px;
  text-align: left;
  line-height: 30px;
  margin-top: 5px;
  font-size: 17px;
  color: #546978;
`;

const riseUp = keyframes `
0% {
  opacity: 0;
  transform: translateY(15px);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`;

const RiseUp = styled.div `
  animation: ${riseUp} 0.75s ease-in-out;
`;

const ContentWrapper = styled(Card)
`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 100px;
`;

const SectionText = styled.p`
  text-align: left;
  line-height: 30px;
  margin-top: 5px;
  font-size: 17px;
  color: #546978;
  margin-bottom: 20px;
`;

const VoteOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 20px;
`;

const OptionText = styled.p`
  text-align: left;
  line-height: 30px;
  font-size: 17px;
  color: #fff;
`;

const CloseIcon = styled.p`
  width: 15px;
  height: 15px;
  background-color: red;
  mask: url(${closeImg}) center no-repeat;
  cursor: pointer;
`;

const ABSTAIN = 'Abstain';

const INITIAL_POLL_STATE = {
    title: '',
    summary: '',
    link: '',
    option: '',
    choices: [ABSTAIN],
    content: '',
    submitAttempted: false,
    selectedTab: 'write',
};

class CreatePollMarkdown extends Component{
    constructor() {
        super();
        this.state = {
            topicKey: '',
            topicTitle: '',
            key: '',
            title: '',
            proposal_blurb: '',
            source: '',
            about: '',
            end_approvals: 0,
            end_percentage: 0,
            date: '',
            documents: [],
            submitted_by: {link: "https://bit.vote.com", name: "MCR Foundation"},
            verified: true,
            govVote: false,
            active: true,
            // summary: '',
            // start: '',
            // end: '',
            // link: '',
            // option: '',
            // choices: [ABSTAIN],
            // content: '',
            submitAttempted: false,
            selectedTab: 'write'
        }
    }

    resetPollState = () => {
        this.setState(INITIAL_POLL_STATE);
    };

    addPollOption = () => {
        const { option, choices } = this.state;
        if (option.length) {
            this.setState({
                option: '',
                choices: [...choices, option]
            });
        }
    };

    removePollOption = idx => {
        const {
            choices
        } = this.state;
        this.setState({
            choices: choices.filter((_, index) => index !== idx)
        });
    };

    handlePollState = (e, key) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const topicKeyValid = !!this.state.topicKey;
        const topicTitleValid = !!this.state.topicTitle;
        const keyValid = !!this.state.key;
        const titleValid = !!this.state.title;
        const proposalBlurbValid = !!this.state.proposal_blurb;
        const sourceValid = !!this.state.source;
        const aboutValid = !!this.state.about;

        // const summaryValid = !!this.state.summary;
        // const linkValid = this.state.link.match(URL_REGEX);
        // const choicesValid = this.state.choices.length > 1;
        // const contentValid = !!this.state.content;
        // const timeValid = this.state.start >= POLL_DEFAULT_START;

        const isValidSubmission =
            topicKeyValid &&
            topicTitleValid &&
            keyValid &&
            titleValid &&
            proposalBlurbValid &&
            sourceValid &&
            aboutValid;
            // summaryValid &&
            // linkValid &&
            // choicesValid &&
            // contentValid &&
            // timeValid;

        const topicKeyError = this.state.submitAttempted && !topicKeyValid;
        const topicTitleError = this.state.submitAttempted && !topicTitleValid;
        const keyError = this.state.submitAttempted && !keyValid;
        const titleError = this.state.submitAttempted && !titleValid;
        const proposalBlurbError = this.state.submitAttempted && !proposalBlurbValid;
        const sourceError = this.state.submitAttempted && !sourceValid;
        const aboutError = this.state.submitAttempted && !aboutValid;

        // const summaryError = this.state.submitAttempted && !summaryValid;
        // const linkError = this.state.submitAttempted && !linkValid;
        // const choicesError = this.state.submitAttempted && !choicesValid;
        // const contentError = this.state.submitAttempted && !contentValid;
        // const timeError = this.state.submitAttempted && !timeValid;

        return (
            <RiseUp>
            <ContentWrapper >
                <Fragment>
                    <SectionText>
                        This form will generate a formatted markdown file which can be copied
                        and included in the cms
                    </SectionText>
                    {[
                        {
                            title: 'TopicKey',
                            placeholder: 'This will be the topic key',
                            value: this.state.topicKey,
                            onChange: e => this.handlePollState(e, 'topicKey'),
                            error: topicKeyError,
                            failureMessage: topicKeyError && 'TopicKey is required',
                            name: "topicKey"
                        },
                        {
                            title: 'TopicTitle',
                            placeholder: 'This will be the topic key',
                            value: this.state.topicTitle,
                            onChange: e => this.handlePollState(e, 'topicTitle'),
                            error: topicTitleError,
                            failureMessage: topicTitleError && 'TopicTitle is required',
                            name: "topicTitle"
                        },
                        {
                            title: 'Key',
                            placeholder: 'This will be the key',
                            value: this.state.key,
                            onChange: e => this.handlePollState(e, 'key'),
                            error: keyError,
                            failureMessage: keyError && 'Key is required',
                            name: "key"
                        },
                        {
                            title: 'Title',
                            placeholder: 'This will be the poll title',
                            value: this.state.title,
                            onChange: e => this.handlePollState(e, 'title'),
                            error: titleError,
                            failureMessage: titleError && 'Title is required',
                            name: "title"
                        },
                        {
                            title: 'Proposal Blurb',
                            placeholder: 'Give blurb of proposal',
                            value: this.state.proposal_blurb,
                            onChange: e => this.handlePollState(e, 'proposal_blurb'),
                            error: proposalBlurbError,
                            failureMessage: proposalBlurbError && 'Proposal Blurb is required',
                            name: "proposal_blurb"
                        },
                        {
                            title: 'Source',
                            placeholder: 'The address of proposal spell',
                            value: this.state.source,
                            onChange: e => this.handlePollState(e, 'source'),
                            error: sourceError,
                            failureMessage: sourceError && 'source must be valid',
                            name: "source"
                        },
                        // {
                        //     title: 'Vote Options',
                        //     placeholder: 'Add possible voting options',
                        //     value: this.state.option,
                        //     onChange: e => this.handlePollState(e, 'option'),
                        //     error: choicesError,
                        //     failureMessage: choicesError && 'Must be at least two voting options',
                        //     after: (
                        //         <Button
                        //         css={{ alignSelf: 'center', marginLeft: '10px' }}
                        //         width="190px"
                        //         onClick={this.addPollOption}
                        //         >
                        //         Add Option
                        //         </Button>
                        //     ),
                        //     name: "option",
                        // }
                    ].map((args, i) => (
                        <CreatePollInput key={i} {...args} />
                    ))}

                {/* <SectionWrapper>
                    <StyledBody />
                    <VoteOptionsGrid>
                    {this.state.choices.map((opt, idx) => (
                        <Card
                        key={idx}
                        css={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '600px',
                            padding: '10px',
                            backgroundColor: '#30BD9F'
                        }}
                        >
                        <OptionText>
                            #{idx} - {opt}
                        </OptionText>
                        {idx > 0 && <CloseIcon onClick={() => this.removePollOption(idx)} />}
                        </Card>
                    ))}
                    </VoteOptionsGrid>
                </SectionWrapper> */}

                    {/* <CreatePollTime
                        {...{
                        start,
                        end,
                        timeError,
                        handleParentState
                        }}
                    /> */}

                    <SectionWrapper>
                        <StyledBody>Proposal:</StyledBody>
                        <Box width="600px">
                        <ReactMde
                            value={this.state.about}
                            onChange={value => this.setState({ about: value })}
                            selectedTab={this.state.selectedTab}
                            onTabChange={tab => this.setState({ selectedTab: tab })}
                            generateMarkdownPreview={markdown =>
                            Promise.resolve(converter.makeHtml(markdown))
                            }
                        />
                        {aboutError && <WarningText>Proposal is required</WarningText>}
                        </Box>
                    </SectionWrapper>

                    <SectionWrapper>
                        <Button
                        onClick={() => {
                            this.setState({
                                submitAttempted: true
                            });
                            if (isValidSubmission) {
                                console.log("Create");
                                this.props.createProposal({
                                    topicKey: this.state.topicKey,
                                    topicTitle: this.state.topicTitle,
                                    key: this.state.key,
                                    title: this.state.title,
                                    proposal_blurb: this.state.proposal_blurb,
                                    source: this.state.source,
                                    about: this.state.about,
                                    end_approvals: this.state.end_approvals,
                                    end_percentage: this.state.end_percentage,
                                    date: this.state.date,
                                    documents: this.state.documents,
                                    submitted_by: this.state.submitted_by,
                                    verified: this.state.verified,
                                    govVote: this.state.govVote,
                                    active: this.state.active,
                                });
                            }
                        }}
                        >
                            Create Markdown
                        </Button>
                        <Box width="32px" />
                        <Button variant="secondary" onClick={this.resetPollState}>
                            Reset Form
                        </Button>
                    </SectionWrapper>
                </Fragment>
            </ContentWrapper>
            </RiseUp>
        );
    }
}

CreatePollMarkdown.propTypes = {
    createProposal: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    errors: state.errors
})
export default connect(mapStateToProps, {
    createProposal,
})(withRouter(CreatePollMarkdown))
