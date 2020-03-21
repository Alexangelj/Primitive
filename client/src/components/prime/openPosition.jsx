import React, { Component } from 'react';
import { colors } from '../../theme';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';



const styles = theme => ({
    submitCard: {
        display: 'flex',
        margin: '16px',
        minWidth: '10%',
        minHeight: '10%',
        flexDirection: 'row',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'column',
        },
        backgroundColor: colors.banner,
        color: colors.primary,
        borderRadius: '0px',
    },
    submitCardTypography: {
        /* margin: '16px', */
        marginLeft: '16px',
        marginRight: '16px',
        marginTop: '16px',
        marginBottom: '4px',
    },
    submitCardText: {
        /* margin: '12px', */
        marginLeft: '12px',
        marginRight: '12px',
        marginBottom: '12px',
        display: 'flex',
        flexDirection: 'row',
        
    },
    submitCardButton: {
        margin: '8px',
        color: colors.background,
        backgroundColor: state => state.isValid ? colors.success : colors.secondary,
        '&:hover': {
            backgroundColor: state => state.isValid ? colors.success : colors.success,
        },
    },

    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: '48px',
        padding: '16px',
        borderRadius: '4px',
    },

    containerTitle: {
        textAlign: 'center',
        margin: '8px',
        letterSpacing: '2px',
        fontSize: '18px',
    },

    rowContainer1: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '6px',
        marginTop: '16px',

    },

    selectedRow1: {
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'row',

    },

    rowItem1H: {
        width: '33%',
        /* textAlign: 'center', */
        fontWeight: '600'
    },

    rowItem2H: {
        width: '100%',
        fontWeight: '600',
        fontSpacing: '1px',
    },

    rowItem3H: {
        /* width: '25%', */
        /* textAlign: 'center', */
        width: '25%',
        marginLeft: '4px',
        fontWeight: '600',
        lettingSpacing: '0px',
        fontSize: '11px',
    },

    rowItem1: {
        width: '33%',
        /* textAlign: 'center', */
    },

    rowItem2: {
        width: '25%',
        marginLeft: '4px',
        /* textAlign: 'center', */
    },

    rowContainer2: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.background,
        borderRadius: '4px',
        marginTop: '16px',
    },

    rowButtonL: {
        backgroundColor: colors.leafGreen,
        color: colors.primary,
        '&:hover' : {
            backgroundColor: colors.leafGreen,
            color: colors.primary,
        },
        fontWeight: '600',
        width: '50%',
        borderRadius: '4px',
        margin:'4px',
    },
    
    
    rowButtonS: {
        backgroundColor: colors.background,
        width: '50%',
        borderRadius: '4px',
        margin:'4px',
        color: colors.primary,
        fontWeight: '600',
    },

    rowButtonSubmit: {
        backgroundColor: colors.leafGreen,
        color: colors.primary,
        '&:hover' : {
            backgroundColor: colors.leafGreen,
            color: colors.primary,
        },
        fontWeight: '600',
        width: '50%',
        borderRadius: '4px',
    },

    amountForm: {
        borderRadius: '4px',
        width: '100%',
        backgroundColor: colors.background,
    },

    rowContainer3: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colors.background,
        borderRadius: '4px',
        marginTop: '16px',
    },

    rowContainer4: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '4px',
        marginTop: '16px',
    },
});


/* SEPARATE */
function MultilineTextFields(props) {
    const { classes } = props;
    const [value, setValue] = React.useState();
  
    const handleChange = event => {
        setValue(event.target.value);
        let value = event.target.value;
        props.handleSelectAmount(props.name, value)
    };

    const handleSubmit = () => {
        props.handleSubmit();
    };
    return (
      <form className={classes.amountForm} noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
          <TextField
            placeholder={'Amount'}
            value={props.amount}
            onChange={handleChange}
          />
    </form>
    );
};


class OpenPosition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            long: true,
            buy: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.newPosition = this.newPosition.bind(this);
    }

    handleChange = (event) => {
        console.log(event.target.value, event.target.name)
        let name = event.target.name;
        let value = event.target.value;
        switch(name) {
            case 'sellMultiplier':
                this.setState({
                    sellMultiplier: value
                });
                break;
            case 'ask': 
                this.setState({
                    ask: value,
                });
                break;
            case 'bid': 
                this.setState({
                    bid: value,
                });
                break;
            case 'buyMultiplier': 
                this.setState({
                    buyMultiplier: value,
                });
                break;
        }
    }; 

    newPosition = async (position) => {
        this.setState({
            newPosition: true,
            position: position,
            sellMultiplier: '',
            buyMultiplier: '',
            bid: '',
            ask: '',
        })
    };

    render () {
        const { classes } = this.props;

        /* OPTION SELECTION DATA OBJECT:
         *
         *  optionSelection: {
                'type': type,
                'pair': pair,
                'expiration': expiration,
                'properties': {
                    ace, 
                    xis, 
                    yak, 
                    zed, 
                    wax, 
                    pow, 
                    gem,
                },
                'cAsset': option.collateralUnits,
                'sAsset': option.strikeUnits,
                'tokenIds': tokenIds,
            } 
         * 
         * 
        */

        let cAmount, cAsset, sAmount, sAsset, expirationDate, cAmt, type, multiplier, tokenIds;
        const option = this.props.optionSelection;
        const pair = option['pair'];
        const expiration = option['expiration'];
        const properties = option['properties'];

        type = option['type'];
        cAsset = option['cAsset'];
        sAsset = option['sAsset'];
        tokenIds = option['tokenIds'];
        
        cAmount = properties.xis;
        sAmount = properties.zed;

        const date = new Date(properties.pow * 1000);
        expirationDate = (date.toDateString());

        if(isNaN(cAmt) && typeof cAmt !== 'undefined') {
            cAmt = 'INVALID';
        }

        /* function switchType(type) {
            if(type) {
                if(long) {
                    return;
                }
                this.setState({long: true})
            } else {
                if(!long) {
                    return;
                }
                this.setState({long: false})
            }
        } */

        if(this.state.newPosition) {
            /* IF THE POSITION SWITCHES TYPE (LONG/SHORT) - SWITCH COLLATERAL AND STRIKE */
            if(this.state.position !== 'long') {
                cAsset = option['sAsset'];
                sAsset = option['cAsset'];
                cAmount = properties.zed;
                sAmount = properties.xis;
            }
            switch(this.state.position) {
                case 'long':
                    if(this.state.long) {
                        break;
                    }
                    this.setState({long: true})
                    break;
                case 'short':
                    if(!this.state.long) {
                        break;
                    }
                    this.setState({long: false})
                    break;
            }
        } else {
            switch(type) {
                case 'call':
                    if(this.state.long) {
                        break;
                    }
                    this.setState({long: true})
                    break;
                case 'put':
                    if(!this.state.long) {
                        break;
                    }
                    this.setState({long: false})
                    break;
            }
        }
        
        multiplier = this.state.sellMultiplier;

        return (
            <>
                <Box className={classes.container}>

                    <Typography variant={'h1'} className={classes.containerTitle}>
                        Open Position
                    </Typography>

                    {(cAsset !== '')
                            ?   <>
                                {/* CALL OR PUT */}
                                <Box className={classes.rowContainer2}>
                                    <Button 
                                        className={(this.state.long) ? classes.rowButtonL : classes.rowButtonS} 
                                        onClick={() => {this.setState({ long: true}); this.newPosition('long');}}
                                    >
                                        Call
                                    </Button>
                                    <Button 
                                        className={(!this.state.long) ? classes.rowButtonL : classes.rowButtonS} 
                                        onClick={() => {this.setState({ long: false}); this.newPosition('short');}}
                                    >
                                        Put
                                    </Button>
                                </Box>

                                {/* BUY OR SELL */}
                                <Box className={classes.rowContainer2}>
                                    <Button 
                                        className={(this.state.buy) ? classes.rowButtonL : classes.rowButtonS} 
                                        onClick={() => this.setState({ buy: true})}
                                    >
                                        Buy
                                    </Button>
                                    <Button 
                                        className={(!this.state.buy) ? classes.rowButtonL : classes.rowButtonS} 
                                        onClick={() => this.setState({ buy: false})}
                                    >
                                        Sell
                                    </Button>
                                </Box>

                                {/* SELECTED PRIME DETAILS */}
                                <Box className={classes.rowContainer1}>
                                    {/* FLEX DIRECTION ROW */}
                                    <Box className={classes.selectedRow1}>
                                        <Typography variant={'h2'} className={classes.rowItem1H}>
                                            Collateral
                                        </Typography>

                                        <Typography variant={'h2'} className={classes.rowItem1H}>
                                            Strike
                                        </Typography>

                                        <Typography variant={'h2'} className={classes.rowItem1H}>
                                            Expiration
                                        </Typography>
                                    </Box>

                                    {/* FLEX DIRECTION ROW */}
                                    <Box className={classes.selectedRow1}>
                                        <Typography variant={'h2'} className={classes.rowItem1}>
                                            {cAmount / 10**18} {cAsset}
                                        </Typography>

                                        <Typography variant={'h2'} className={classes.rowItem1}>
                                            {sAmount / 10**18} {sAsset}
                                        </Typography>

                                        <Typography variant={'h2'} className={classes.rowItem1}>
                                            {expirationDate}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* BID/ASK DEPOSIT/QTY FORM */}
                                {(this.state.buy)   
                                    ?   <Box className={classes.rowContainer1}>
                                            {/* FLEX DIRECTION ROW */}
                                            <Box className={classes.selectedRow1}>
                                                <Typography variant={'h1'} className={classes.rowItem1H} >
                                                    BID
                                                </Typography>
                                            </Box>
                                            <Box className={classes.rowContainer3}>
                                            
                                                <TextField
                                                  className={classes.amountForm}
                                                  placeholder={'Bid Price'}
                                                  value={this.state.bid}
                                                  onChange={this.handleChange}
                                                  name='bid'
                                                />
                                                <Typography variant={'h3'} style={{ fontWeight: '600', letterSpacing: '1px', width: '25%', textAlign: 'center', margin: '4px', padding: '4px', alignItems: 'center', justifyContent: 'center', display: 'flex', backgroundColor: colors.lightBanner, borderRadius: '4px'}}>
                                                    {'ETH'}
                                                </Typography>
                                            </Box>

                                            {/* FLEX DIRECTION ROW */}
                                            <Box className={classes.selectedRow1}>
                                                <Typography variant={'h1'} className={classes.rowItem1H} >
                                                    Multiplier
                                                </Typography>
                                            </Box>
                                            <Box className={classes.rowContainer3}>
                                            
                                                <TextField
                                                  className={classes.amountForm}
                                                  placeholder={'Multiplier'}
                                                  value={this.state.buyMultiplier}
                                                  onChange={this.handleChange}
                                                  name='buyMultiplier'
                                                />
                                                <Typography variant={'h3'} style={{ fontWeight: '600', letterSpacing: '1px', width: '25%', textAlign: 'center', margin: '4px', padding: '4px', alignItems: 'center', justifyContent: 'center', display: 'flex', backgroundColor: colors.lightBanner, borderRadius: '4px'}}>
                                                    {'Prime'}
                                                </Typography>
                                            </Box>

                                            <Box className={classes.selectedRow1}>
                                                <Typography variant={'h1'} className={classes.rowItem2H} >
                                                    Subtotal
                                                </Typography>
                                            </Box>
                                            {/* FLEX DIRECTION ROW */}
                                            <Box className={classes.selectedRow1}>
                                                <Typography variant={'h2'} className={classes.rowItem1}>
                                                    Cost:
                                                </Typography>
                                                <Typography variant={'h2'} className={classes.rowItem1}>
                                                    {this.state.bid} {'ETH'}
                                                </Typography>
                                                <Typography variant={'h2'} className={classes.rowItem1}>
                                                    Credited:
                                                </Typography>
                                                <Typography variant={'h2'} className={classes.rowItem1}>
                                                    A {this.state.buyMultiplier}x Multiplied {'Prime'}
                                                </Typography>
                                            </Box>
                                                    

                                        </Box>
                                        :   <Box className={classes.rowContainer1}>

                                                {/* FLEX DIRECTION ROW */}
                                                <Box className={classes.selectedRow1}>
                                                    <Typography variant={'h1'} className={classes.rowItem1H} >
                                                        ASK
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.rowContainer3}>
                                
                                                    <TextField
                                                      className={classes.amountForm}
                                                      placeholder={'Ask Price'}
                                                      value={this.state.ask}
                                                      onChange={this.handleChange}
                                                      name='ask'
                                                    />
                                                    <Typography variant={'h3'} style={{ fontWeight: '600', letterSpacing: '1px', width: '25%', textAlign: 'center', margin: '4px', padding: '4px', alignItems: 'center', justifyContent: 'center', display: 'flex', backgroundColor: colors.lightBanner, borderRadius: '4px'}}>
                                                        {'ETH'}
                                                    </Typography>
                                                </Box>

                                                {/* FLEX DIRECTION ROW */}
                                                <Box className={classes.selectedRow1}>
                                                    <Typography variant={'h1'} className={classes.rowItem1H} >
                                                        Multiplier
                                                    </Typography>
                                                </Box>
                                                <Box className={classes.rowContainer3}>
                                
                                                    <TextField
                                                      className={classes.amountForm}
                                                      placeholder={'Multiplier'}
                                                      value={this.state.sellMultiplier}
                                                      onChange={this.handleChange}
                                                      name='sellMultiplier'
                                                    />
                                                    <Typography variant={'h3'} style={{ fontWeight: '600', letterSpacing: '1px', width: '25%', textAlign: 'center', margin: '4px', padding: '4px', alignItems: 'center', justifyContent: 'center', display: 'flex', backgroundColor: colors.lightBanner, borderRadius: '4px'}}>
                                                        {(this.state.sellMultiplier * cAmount) / 10**18} {cAsset}
                                                    </Typography>
                                                </Box>

                                                {/* FLEX DIRECTION COLUMN */}
                                                <Box className={classes.rowContainer1}>

                                                    <Box className={classes.selectedRow1}>
                                                        <Typography variant={'h2'} className={classes.rowItem2H} >
                                                            Sell a {multiplier}x multiplied Prime for {this.state.ask} {'ETH'} total
                                                        </Typography>
                                                    </Box>

                                                    <Box className={classes.selectedRow1}>
                                                        <Typography variant={'h1'} className={classes.rowItem2H} style={{marginTop: '16px',}} >
                                                            Mint Prime Option NFT
                                                        </Typography>
                                                    </Box>
                                                    

                                                    {/* FLEX DIRECTION ROW */}
                                                    <Box className={classes.selectedRow1}>
                                                        <Typography variant={'h2'} className={classes.rowItem3H}>
                                                            Multiplier
                                                        </Typography>
                                                        <Typography variant={'h2'} className={classes.rowItem3H}>
                                                            Collateral
                                                        </Typography>
                                                
                                                        <Typography variant={'h2'} className={classes.rowItem3H}>
                                                            Strike
                                                        </Typography>
                                                
                                                        <Typography variant={'h2'} className={classes.rowItem3H}>
                                                            Expiration
                                                        </Typography>
                                                    </Box>

                                                    {/* FLEX DIRECTION ROW */}
                                                    <Box className={classes.selectedRow1}>
                                                        <Typography variant={'h2'} className={classes.rowItem2}>
                                                            {multiplier}x
                                                        </Typography>

                                                        <Typography variant={'h2'} className={classes.rowItem2}>
                                                            {cAmount * this.state.sellMultiplier / 10**18} {cAsset}
                                                        </Typography>

                                                        <Typography variant={'h2'} className={classes.rowItem2}>
                                                            {sAmount * this.state.sellMultiplier / 10**18} {sAsset}
                                                        </Typography>

                                                        <Typography variant={'h2'} className={classes.rowItem2}>
                                                            {expirationDate}
                                                        </Typography>
                                                    </Box>

                                                    <Box className={classes.selectedRow1}>
                                                        <Typography variant={'h1'} className={classes.rowItem2H} >
                                                            Subtotal
                                                        </Typography>
                                                    </Box>

                                                    {/* FLEX DIRECTION ROW */}
                                                    <Box className={classes.selectedRow1}>
                                                        <Typography variant={'h2'} className={classes.rowItem1}>
                                                            Deposit:
                                                        </Typography>

                                                        <Typography variant={'h2'} className={classes.rowItem1}>
                                                            {cAmount * this.state.sellMultiplier / 10**18} {cAsset}
                                                        </Typography>

                                                        <Typography variant={'h2'} className={classes.rowItem1}>
                                                            Credited:
                                                        </Typography>

                                                        <Typography variant={'h2'} className={classes.rowItem1}>
                                                            {this.state.ask} {'ETH'}
                                                        </Typography>
                                                    </Box>

                                                </Box>


                                            </Box>
                                }

                                {/* SUBMIT ORDER BUTTON */}
                                <Box className={classes.rowContainer4}>
                                    <Button 
                                        className={classes.rowButtonSubmit} 
                                        onClick={() => {
                                                this.props.handleOrder(
                                                    this.state.buy,
                                                    this.state.bid, 
                                                    this.state.buyMultiplier,
                                                    this.state.ask, 
                                                    this.state.sellMultiplier, 
                                                    pair,
                                                    expiration,
                                                    cAmount, 
                                                    cAsset, 
                                                    sAmount, 
                                                    sAsset,
                                                );
                                            }
                                        }
                                    >
                                        {(this.state.buy) ? 'Open Buy Order' :  'Open Sell Order'}
                                    </Button>
                                </Box>
                                </>

                            :   <Typography variant={'h1'} className={classes.containerTitle} style={{ height: '50vh', alignItems: 'center', display: 'flex', justifyContent: 'center',}}>
                                    Select an Option
                                </Typography>
                    }

                </Box>
            </>
        );
    };
};

export default withStyles(styles)(OpenPosition);