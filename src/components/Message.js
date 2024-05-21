import '../App.css'


function Message(props){
    return (
        <div className={props.className}>
        <a>{props.content}</a>
        </div>
    );
}

export default Message;