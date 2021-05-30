import React from 'react'
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Comment from './Comment';
import Header2 from './Header2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../CSS/Board_detail.css'

class Board_detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IDX: '',
            REPLY: []
        };
    }

    componentDidMount() {
        this.setState({IDX: String(this.props.location.search).replace('?idx=', '')});
        fetch('http://localhost:3001/board/select', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                IDX: String(this.props.location.search).replace('?idx=', '')
            })
        })
        .then(res=>res.json())
        .then(res=>{
            document.getElementById('TITLE').value = res[0].TITLE;
            document.getElementById('ID').value = res[0].ID;
            document.getElementById('CONTENT').value = res[0].CONTENT;
        })
        .then(()=>{
            fetch('http://localhost:3001/board/select_reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    B_IDX: String(this.props.location.search).replace('?idx=', '')
                })
            })
            .then(res=>res.json())
            .then(res=>{
                const temp = []
                let count = 0;
                for (let i = 0; i < res.length; i++) {
                    temp.push(
                    <div style={{marginTop: "30px"}}>
                        <span style={{float: "left"}}>{res[i].ID}</span>
                        <span style={{float: "right"}}>{res[i].REP_DATE}</span>
                        <br></br>
                        <div style={{float: "left"}}>
                            <Input
                            id={'content' + count}
                            style={{color: "black"}}
                            disabled={true}
                            disableUnderline 
                            defaultValue={res[i].CONTENT}/>
                            <button
                            hidden={!((localStorage.getItem('id') === res[i].ID) ||
                            (localStorage.getItem('id') === 'admin'))}>
                                수정
                            </button>
                        </div>
                        <br></br>
                        <br></br>
                        <hr></hr>
                    </div>);
                    count++;
                }
                this.setState({REPLY: temp});
            })
        })
    }

    render() {
        return (
            <div style={{height: "100vh", overflowY: "scroll"}}>
                <Header2></Header2>
                <center>
                    <Card style={{width: "800px", marginTop: "90px"}} variant="outlined">
                        <CardContent>
                            <p>
                                <Input
                                id="TITLE"
                                style={{width: "700px", color: "black"}}
                                defaultValue="제목 들어갈 곳"
                                disabled />
                            </p>
                            <Grid>
                                <Grid item>
                                    <AccountCircle />
                                    <Input
                                    id="ID"
                                    style={{color: "black"}}
                                    defaultValue="작성자"
                                    disabled />
                                </Grid>
                                <Grid item>
                                </Grid>
                            </Grid>
                            <TextField
                            className="disibled_color"
                            id="CONTENT"
                            multiline rows={25}
                            rowsMax={25}
                            variant="outlined"
                            disabled
                            />
                        </CardContent>
                    </Card>
                    <Card style={{width: 800, marginTop: 13}} variant="outlined">
                        <CardContent>
                            <p> </p>
                            <Typography variant="h7" style={{marginRight: "650px", maxWidth: '100px'}}>
                                댓글
                            </Typography>
                            <Comment B_IDX={this.state.IDX}></Comment>
                            {this.state.REPLY.map((val)=>{
                                return val;
                            })}
                        </CardContent>
                    </Card>
                </center>
            </div>
        )
    }
}

export default Board_detail