const sqlite3 = require('sqlite3').verbose();

module.exports = {
	name: 'setalert',
	description: 'set an alert',
	execute(message, args) {
    
    let db= new sqlite.Database('./testdb.db', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);	
    db.run('CREATE TABLE IF NOT EXISTS data(username TEXT NOT NULL, ratio INTEGER NOT NULL, address TEXT NOT NULL)');
    

    let insertdata=db.prepare('INSERT INTO data VALUES(?,?,?)');
    const username='statelayer';
    const ratio=150;
    const address='0x';
    insertdata.run(username, ratio, address);

    //db.close();


    },
    
    
};