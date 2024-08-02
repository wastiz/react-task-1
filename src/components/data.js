import {v4 as uuidv4} from "uuid";

const dumpWidgetData = [
    {
        id: uuidv4(),
        content: 'Numbers of Customers'
    },
    {
        id: uuidv4(),
        content: 'Debt Capacity'
    },
    {
        id: uuidv4(),
        content: 'Outstanding invoices'
    },
    {
        id: uuidv4(),
        content: 'Whatever else'
    },
];

export const dumpContainers = {
    [uuidv4()]: {
        width: 200,
        height: 600,
        items: [],
    },
    [uuidv4()]: {
        width: 600,
        height: 300,
        items: [],
    },
    [uuidv4()]: {
        width: 200,
        height: 300,
        items: [],
    },
    [uuidv4()]: {
        width: 200,
        height: 300,
        items: [],
    },
    [uuidv4()]: {
        width: 200,
        height: 300,
        items: [],
    },
    [uuidv4()]: {
        width: 50,
        height: 300,
        items: dumpWidgetData,
    },
};

