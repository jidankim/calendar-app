import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { EventList, Write } from 'components';
import { eventPostRequest, eventListRequest, eventEditRequest } from 'actions/event';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  icon: {
    fontSize: 20,
  },
});

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handlePost = this.handlePost.bind(this);
        // this.loadNewEvent = this.loadNewEvent.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.state = {
          toggleToast: false
        };
    }

    componentDidMount() {
      this.props.eventListRequest(true).then(
              () => {
                  console.log(this.props.eventData);
              }
          );
    }

    // componentDidMount() {
    //     // LOAD NEW EVENT EVERY 5 SECONDS
    //     const loadEventLoop = () => {
    //         this.loadNewEvent().then(
    //             () => {
    //                 this.eventLoaderTimeoutId = setTimeout(loadEventLoop, 5000);
    //             }
    //         );
    //     };
    //
    //     this.props.eventListRequest(true).then(
    //         () => {
    //             // BEGIN NEW EVENT LOADING LOOP
    //             loadEventLoop();
    //         }
    //     );
    // }
    //
    // componentWillUnmount() {
    //     // STOPS THE loadEventLoop
    //     clearTimeout(this.eventLoaderTimeoutId);
    // }
    //
    // loadNewEvent() {
    //     // CANCEL IF THERE IS A PENDING REQUEST
    //     if (this.props.listStatus === 'WAITING')
    //         return new Promise((resolve, reject) => {
    //             resolve();
    //         });
    //
    //     console.log(this.props.eventData);
    //     // IF PAGE IS EMPTY, DO THE INITIAL LOADING
    //     if (this.props.eventData.length === 0)
    //         return this.props.eventListRequest(true);
    //
    //     return this.props.eventListRequest(false, 'new', this.props.eventData[0]._id);
    // }

    handleClick = () => {
      this.setState({ toggleToast: true });
    }

    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      this.setState({ toggleToast: false });
    }

    /* POST EVENT */
    handlePost(contents) {
        const { classes } = this.props;

        return this.props.eventPostRequest(contents).then(
            () => {
                if (this.props.postStatus.status === "SUCCESS") {
                    // TRIGGER LOAD NEW EVENT
                    // this.loadNewEvent().then(
                    //     () => {
                            this.handleClick;
                            <Snackbar
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              open={this.state.toggleToast}
                              autoHideDuration={5000}
                              onClose={this.handleClose}
                              ContentProps={{
                                'aria-describedby': 'message-id',
                              }}
                              message={
                                <span id="message-id">
                                  <CheckCircleIcon className={classes.icon} />
                                  Success!
                                </span>
                              }
                              action={[
                                <IconButton
                                  key="close"
                                  aria-label="Close"
                                  color="inherit"
                                  className={classes.close}
                                  onClick={this.handleClose}
                                >
                                  <CloseIcon />
                                </IconButton>,
                              ]}
                            />
                    //     }
                    // );
                } else {
                    /*
                        ERROR CODES
                            1: NOT LOGGED IN
                            2: EMPTY CONTENTS
                    */
                    switch(this.props.postStatus.error) {
                        case 1:
                            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                            this.handleClick;
                            <Snackbar
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              open={this.state.toggleToast}
                              autoHideDuration={5000}
                              onClose={this.handleClose}
                              ContentProps={{
                                'aria-describedby': 'message-id',
                              }}
                              message={
                                <span style="color: #FFB4BA" id="message-id">
                                  <ErrorIcon className={classes.icon} />
                                  You are not logged in
                                </span>
                              }
                              action={[
                                <IconButton
                                  key="close"
                                  aria-label="Close"
                                  color="inherit"
                                  className={classes.close}
                                  onClick={this.handleClose}
                                >
                                  <CloseIcon />
                                </IconButton>,
                              ]}
                            />
                            setTimeout(() => {location.reload(false);}, 2000);
                            break;
                        case 2:
                            this.handleClick;
                            <Snackbar
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              open={this.state.toggleToast}
                              autoHideDuration={5000}
                              onClose={this.handleClose}
                              ContentProps={{
                                'aria-describedby': 'message-id',
                              }}
                              message={
                                <span style="color: #FFB4BA" id="message-id">
                                  <ErrorIcon className={classes.icon} />
                                  Please write something
                                </span>
                              }
                              action={[
                                <IconButton
                                  key="close"
                                  aria-label="Close"
                                  color="inherit"
                                  className={classes.close}
                                  onClick={this.handleClose}
                                >
                                  <CloseIcon />
                                </IconButton>,
                              ]}
                            />
                            break;
                        default:
                            this.handleClick;
                            <Snackbar
                              anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                              }}
                              open={this.state.toggleToast}
                              autoHideDuration={5000}
                              onClose={this.handleClose}
                              ContentProps={{
                                'aria-describedby': 'message-id',
                              }}
                              message={
                                <span style="color: #FFB4BA" id="message-id">
                                  <ErrorIcon className={classes.icon} />
                                  Something broke
                                </span>
                              }
                              action={[
                                <IconButton
                                  key="close"
                                  aria-label="Close"
                                  color="inherit"
                                  className={classes.close}
                                  onClick={this.handleClose}
                                >
                                  <CloseIcon />
                                </IconButton>,
                              ]}
                            />
                            break;
                    }
                }
            }
        );
    }

    handleEdit(id, index, contents) {
        const { classes } = this.props;

        return this.props.eventEditRequest(id, index, contents).then(
            () => {
                if (this.props.editStatus.status === "SUCCESS") {
                  this.handleClick;
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={this.state.toggleToast}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                    ContentProps={{
                      'aria-describedby': 'message-id',
                    }}
                    message={
                      <span id="message-id">
                        <CheckCircleIcon className={classes.icon} />
                        Success!
                      </span>
                    }
                    action={[
                      <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                      >
                        <CloseIcon />
                      </IconButton>,
                    ]}
                  />
                } else {
                    /*
                        ERROR CODES
                            1: INVALID ID,
                            2: EMPTY CONTENTS,
                            3: NOT LOGGED IN,
                            4: NO RESOURCE,
                            5: PERMISSION FAILURE
                    */
                    let errorMessage = [
                        'Something broke',
                        'Please write something',
                        'You are not logged in',
                        'That event does not exist anymore',
                        'You do not have permission'
                    ];

                    let error = this.props.editStatus.error;

                    // NOTIFY ERROR
                    this.handleClick();
                    <SnackbarContent
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={this.state.toggleToast}
                      autoHideDuration={5000}
                      onClose={this.handleClose}
                      ContentProps={{
                        'aria-describedby': 'message-id',
                      }}
                      message={
                        <span style="color: #FFB4BA" id="message-id">
                          <ErrorIcon className={classes.icon} />
                          {errorMessage[error - 1]}
                        </span>
                      }
                      action={[
                        <IconButton
                          key="close"
                          aria-label="Close"
                          color="inherit"
                          className={classes.close}
                          onClick={this.handleClose}
                        >
                          <CloseIcon />
                        </IconButton>,
                      ]}
                    />

                    // IF NOT LOGGED IN, REFRESH THE PAGE AFTER 2 SECONDS
                    if (error === 3) {
                        setTimeout(() => {location.reload(false)}, 2000);
                    }
                }
            }
        );
    }

    render() {
        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? (
                  <div>
                    <Write onPost={this.handlePost}/>
                    <EventList
                        data={this.props.eventData}
                        currentUser={this.props.currentUser}
                        onEdit={this.handleEdit}
                    />
                  </div>
                ) : (
                  <div className="intro">
                    Welcome. Please log in.
                  </div>
                ) }
            </div>
        );
    }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.event.post,
        currentUser: state.authentication.status.currentUser,
        eventData: state.event.list.data,
        listStatus: state.event.list.status,
        editStatus: state.event.edit
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        eventPostRequest: (contents) => {
            return dispatch(eventPostRequest(contents));
        },
        eventListRequest: (isInitial, listType, id, username) => {
            return dispatch(eventListRequest(isInitial, listType, id, username));
        },
        eventEditRequest: (id, index, contents) => {
            return dispatch(eventEditRequest(id, index, contents));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
