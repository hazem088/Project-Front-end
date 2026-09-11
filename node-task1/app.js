const fs = require('fs');
const yargs = require('yargs');

const filePath = 'data.json';

const loadData = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        return JSON.parse(dataBuffer.toString());
    } catch (e) {
        return [];
    }
};

const saveData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

yargs.command({
    command: 'add',
    describe: 'Add a person',
    builder: {
        id: { type: 'string', demandOption: true },
        fname: { type: 'string', demandOption: true },
        lname: { type: 'string', demandOption: true },
        age: { type: 'number', demandOption: true },
        city: { type: 'string', demandOption: true }
    },
    handler(argv) {
        const people = loadData();
        const duplicate = people.find((p) => p.id === argv.id);
        
        if (!duplicate) {
            people.push({
                id: argv.id,
                fname: argv.fname,
                lname: argv.lname,
                age: argv.age,
                city: argv.city
            });
            saveData(people);
            console.log('✅ Person added successfully!');
        } else {
            console.log('❌ ID already exists!');
        }
    }
});

yargs.command({
    command: 'read',
    describe: 'Read person by ID',
    builder: {
        id: { type: 'string', demandOption: true }
    },
    handler(argv) {
        const people = loadData();
        const person = people.find((p) => p.id === argv.id);
        if (person) {
            console.log(`👤 ID: ${person.id} | Name: ${person.fname} ${person.lname} | Age: ${person.age} | City: ${person.city}`);
        } else {
            console.log('❌ Person not found!');
        }
    }
});

yargs.command({
    command: 'list',
    describe: 'List all people',
    handler() {
        const people = loadData();
        if (people.length === 0) {
            console.log('⚠️ No data found.');
        } else {
            console.log('📋 All People:');
            people.forEach((p) => {
                console.log(`ID: ${p.id} | Name: ${p.fname} ${p.lname} | Age: ${p.age} | City: ${p.city}`);
            });
        }
    }
});

yargs.command({
    command: 'delete',
    describe: 'Delete person by ID or delete all',
    builder: {
        id: { type: 'string' },
        all: { type: 'boolean' }
    },
    handler(argv) {
        let people = loadData();

        if (argv.all) {
            saveData([]);
            console.log('🗑️ All people deleted!');
        } else if (argv.id) {
            const filtered = people.filter((p) => p.id !== argv.id);
            if (people.length > filtered.length) {
                saveData(filtered);
                console.log(`🗑️ Person ID ${argv.id} deleted!`);
            } else {
                console.log('❌ ID not found!');
            }
        } else {
            console.log('⚠️ Use --id=<id> or --all');
        }
    }
});

yargs.command({
    command: 'summary',
    describe: 'List full names and cities',
    handler() {
        const people = loadData();
        console.log('👥 Full Name & City:');
        people.forEach((p) => {
            console.log(`- ${p.fname} ${p.lname} | ${p.city}`);
        });
    }
});

yargs.parse();