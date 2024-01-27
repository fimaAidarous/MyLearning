import Express, { request, response } from "express";
import { Book } from '../models/bookmodels.js';

const router = Express.Router();

//Rouer for Save
router.post('/', async (request,response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publisherYear
        ) {
            return response.status(400).send ({
                message: "Send all required fileds:title,author,publisherYear",
            });
        }
        const newBook = {
            title:request.body.title,
            author:request.body.author,
            publisherYear:request.body.publisherYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message:error.message});
    }
});


//Route for Get All Books From database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data:books,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({  message: error.message });
    }
});

//Route for Get all Books from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({  message: error.message });
    }
});

//Route for Update book
router.put ('/:id', async (request,response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publisherYear
        ) {
            return response.status(400).send ({
            message:"Send all required fileds:title,author,publisherYear",
            });
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message:"Book Not Found" });
        }
        return response.status(200).send({message: "Book updated successful" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for Delete a Book
router.delete('/:id', async (request,response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);
        if(!result) {
            return response.status(404).json({ message: "Book not found"});
        }
        return response.status(200).send({ message:"Book Deleted SuccessFullly"});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message:error.message});
    }
});
export default router;

