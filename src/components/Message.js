import '../App.css'


function Message(props){
    return (
        <div className={props.className}>
            <span>{props.msg.content}</span>
            <p>{props.msg.time}</p>
        </div>
    );
}

export default Message;