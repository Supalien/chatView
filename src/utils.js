export function getMessages(txt) {
    txt += '00/00/00\n'; // so regex match last line also
    let lines = getLines(txt);
    return lines.map(line => {
        let [datetime, msg] = line.split(' - ');
        let [date, time] = datetime.split(', ');
        let [author, content] = msg.split(': ');
        return {
            date: date,
            time: time,
            author: author,
            content: content
        }
    }).filter(line => line.content !== undefined);
}

function getLines(txt) {
    const pat = /(\d{1,2}\/\d{1,2}\/\d\d.*?)(?=^\d{1,2}\/\d{1,2}\/\d\d)/gms; // matches 2 dates and all lines between them
    let lines = [...txt.matchAll(pat)];
    lines = lines.map(l => l[1]);
    return lines;
}
// in the future it will let the user choose the designated person between all authors (for group chats)
export function getDesignated(name) {
    name = name.replace('WhatsApp Chat with ', '');
    name = name.replace('.txt', '');
    return name;
}