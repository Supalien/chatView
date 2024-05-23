import '../App.css'


function Message(props){
    return (
        <div className={props.className}>
        <a>{props.msg.content}</a>
        </div>
    );
}

export default Message;