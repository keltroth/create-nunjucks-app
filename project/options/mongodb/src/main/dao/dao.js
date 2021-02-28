import mongodb from 'mongodb';

const {MongoClient, ObjectID} = mongodb;

const dao = {};

let collection;
let client;

async function connect() {
    if (!(client && client.isConnected() && collection)) {
        try {
            const urlMongo = `mongodb://${global.config.db.username}:${global.config.db.password}@${global.config.db.hostname}:${global.config.db.port}/${global.config.db.name}`;
            client = await MongoClient.connect(urlMongo, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            const db = await client.db(global.config.db.name);
            collection = await db.collection(global.config.db.collection);
            console.log('Connected to mongodb');
        } catch (e) {
            console.error(e);
        }
    }
}

(async () => {
    await connect();
})();


/**
 * Read a object from database by its id
 * @param query object of query
 * @param sort sort index
 * @param page page
 * @param size page size
 * @returns a promise
 */
dao.read = async (query, sort, page, size) => {
    if (!query) {
        query = {};
    }

    // Querying by ID
    if (query._id) {
        query._id = new ObjectID(query._id);
    } else if (query.id) {
        query._id = new ObjectID(query.id);
        delete query.id;
    }

    if (!page) {
        page = 1;
    }

    if (!size) {
        size = global.config.application.page_size;
    }

    const obj = await collection.find(query)
        .sort(sort)
        .skip(size * (page - 1))
        .limit(size);
    return obj.toArray();
};


/**
 * Count the total amount of result for a query
 * @param query
 * @return count
 */
dao.count = async (query) => {
    if (!query) {
        query = {};
    }
    // Querying by ID
    if (query._id) {
        query._id = new ObjectID(query._id);
    } else if (query.id) {
        query._id = new ObjectID(query.id);
        delete query.id;
    }

    return collection.find(query).count();
};

/**
 * Updates or inserts into collection
 * @param theObject to be updated
 * @return a Promise
 */
dao.update = async (theObject) => {
    if (!theObject) {
        throw new Error('Won\'t save an empty object');
    }

    // Querying by ID
    if (theObject._id) {
        theObject._id = new ObjectID(theObject._id);
    } else if (theObject.id) {
        theObject._id = new ObjectID(theObject.id);
        delete theObject.id;
    }

    if (!theObject._id) {
        throw new Error('Can not update an object without id.');
    }

    return collection.updateOne({_id: theObject._id}, {$set: theObject}, {upsert: false});
};

/**
 * Deletes a object by id
 * @param query
 * @returns a Promise
 */
dao.delete = async (query) => {
    // Querying by ID
    if (query._id) {
        query._id = new ObjectID(query._id);
    } else if (query.id) {
        query._id = new ObjectID(query.id);
        delete query.id;
    }
    if (!query._id) {
        throw new Error('Id not found');
    }
    return collection.deleteOne(query);
};

/**
 * Close the connection
 */
dao.close = async () => {
    if (collection) {
        client.close();
        collection = undefined;
    }
};

export default dao;
