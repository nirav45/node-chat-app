// [{
//     id: '/#12poiajdspfoif',
//     name: 'Nirav Patel',
//     room: 'The Office Fans'
// }]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        var user = this.users.filter((user) => user.name === name && user.room === room)[0];
        console.log(user);
        if (!user) {
            var user1 = {id, name, room};
            this.users.push(user1);
            console.log(user);
            return user1;
        } else {
            return false;
        }
    }
    removeUser (id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }
    getUser (id) {
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList (room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }
//
// var me = new Person('Andrew', 25);
// var description = me.getUserDescription();
// console.log(description);
