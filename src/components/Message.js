import '../App.css'


function Message(props){
    return (
        <div className={props.className} key={props.id} id={props.id}>
            <span>{props.msg.content}</span>
            {props.children}
            <p>{props.msg.time}</p>
        </div>
    );
}

export default Message;