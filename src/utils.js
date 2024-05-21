

export function getMessages(txt) {
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
    });
}

function getLines(txt) {
    const pat = /(\d{1,2}\/\d{1,2}\/\d\d.*?)(?=^\d{1,2}\/\d{1,2}\/\d\d)/gms;
    let lines = [...txt.matchAll(pat)];
    lines = lines.map(l=>l[1]);
    return lines;
}

export function getDesignated(name) {
    console.log('name', name)
    name = name.replace('WhatsApp Chat with ', '');
    name = name.replace('.txt', '');
    return name;
}

// console.log(getMessages(link));