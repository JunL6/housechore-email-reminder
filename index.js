const { getISOWeek } = require("date-fns");
// TODO: 
// const roommates = require("./roommates.js");
const nodemailer = require('nodemailer');
const { WEEKLY_CHORES, MONTHLY_CHORES } = require("./chores.js")



const roommates = [
    {
        id: 0,
        name: "Dan",
        email: "l.jun1717@gmail.com"
    },
    {
        id: 1,
        name: "Jun",
        email: "l.jun1717@gmail.com"
    },
    {
        id: 2,
        name: "Tyler",
        email: ""
    },
    {
        id: 3,
        name: "Jesse",
        email: ""
    }
]

function calculateChoreIDs() {
    const today = new Date();
    const weekNum = getISOWeek(today);
    const weeklyChoreOffset = weekNum % 4 - 1;
    const monthNum = today.getMonth() + 1;
    const monthlyChoreOffset = monthNum % 4 - 1; 

    console.log("weekNum", weekNum)
    console.log(weeklyChoreOffset,
        monthlyChoreOffset)
    
    return {
        weeklyChoreOffset,
        monthlyChoreOffset
    }
}


function sendEmail(roommateID, roommateEmail, roommateName, weeklyChoreOffset, monthlyChoreOffset, weeklyChores, monthlyChores) {
    const weeklyChoreIndex = (roommateID + weeklyChoreOffset) % 4;
    const monthlyChoreIndex = (roommateID + monthlyChoreOffset) % 4;
    console.log()
    // TODO: use HTML to format prettier
    const text = `Hi ${roommateName}, your weekly chore is [${weeklyChores[weeklyChoreIndex].task}],
    and your monthly chore is [${monthlyChores[monthlyChoreIndex].task}]`
    
    console.log(text)

    if(!roommateEmail) 
        return;

    const transporter = nodemailer.createTransport({
        service: 'gmail',  // Use your email service (e.g., Gmail, Outlook)
        auth: {
          user: 'jun.liu1717@gmail.com',  // Replace with your email address
        }
      });

    const mailOptions = {
        from: "jun.liu1717@gmaill.com",
        to: roommateEmail,
        subject: "House Chore Weekly Reminder",
        text
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
}

function sendReminders(roommates) {
    console.log(roommates)
    const { weeklyChoreOffset, monthlyChoreOffset } = calculateChoreIDs();
    for(const roommate of roommates) {
        sendEmail(roommate.id, roommate.email, roommate.name, weeklyChoreOffset, monthlyChoreOffset, WEEKLY_CHORES, MONTHLY_CHORES)
    }
}

sendReminders(roommates);


