const functions = require('firebase-functions'); 

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.onTaskDelete = functions 
    .database
    .ref('tasks/{taskId}') 
    .onDelete((snapshot, context) => {
        const json = snapshot.val(); 
        const key = context.params.taskId;

        const log = Object.assign({ deletedAt: context.timestamp }, json);
        
        return admin
            .database()
            .ref(`/logs/${key}`)
            .set(log);
    });
