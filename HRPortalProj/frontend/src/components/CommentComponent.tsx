import {useState} from 'react';
import axios from "axios";

interface Comment{
    description:String,
    createBy:String,
    time:Date
}

export default function CommentComponent(props:any){
    //console.log('comment component props', props)
    const [prop, setProp] = useState(props);
    const [newComment, setNewComment] = useState(props);
    const commentList:Array<Comment> = prop.comments;
    var address = props.address;
    var report = props.report;
    var content:any = [];
    if (!commentList){
        return (
            <div></div>
        )
    }
    for (let comment of commentList){
        content.push(
            <div>
                <div>Description: {comment.description}</div>
                <div>CreateBy: {comment.createBy}</div>
                <div>TimeStamp: {comment.time.toString()}</div>
            </div>
        )
    }

    async function updateReportComment(){
        var temp = {
            description:newComment,
            createBy:props.user,
            time: new Date()
        };
        commentList.push(temp);
        setProp(
            (prevState:any) => ({ ...prevState, comments: commentList})
        );
        var houseUpdateInfo = {
            oldAddress:address,
            reportInfo:report,
            commentList:prop.comments
        };
        axios.post("/house/update", houseUpdateInfo).then(async res => {
            // console.log(res.data);
            if (res.data.result == 'success'){
                console.log(res.data)
            }
        });
    }

    const updateInputData =(e:any) => {
        setNewComment(e.target.value);
    }

    return (
        <div style={{border: '1px solid black',borderRadius: '5px!important', margin:'1px'}}>
            {content}
            <label>Add Comment:</label>
            <input type='text' onChange={updateInputData}></input>
            <button value={props.user} onClick={updateReportComment}>Submit</button>
        </div>
        
    )
}