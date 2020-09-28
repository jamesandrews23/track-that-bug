package com.trackthatbug.trackthatbug.services;

import com.trackthatbug.trackthatbug.models.CustomSequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
public class NextSequenceService {
    private MongoOperations mongoOperations;

    public long getNextSequence(String seqName){
        CustomSequence counter = mongoOperations.findAndModify(
                query(where("_id").is(seqName)),
                new Update().inc("sequence",1),
                options().returnNew(true).upsert(true),
                CustomSequence.class);
        return counter != null ? counter.getSequence() : 1;
    }

    @Autowired
    public void setMongoOperations(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }
}
