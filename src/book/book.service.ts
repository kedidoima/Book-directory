import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/createBook.dto';
import { Book, BookDocument } from './schema/book.schema';

@Injectable()
export class BookService {
    constructor (
        @InjectModel(Book.name) private bookModel : Model<BookDocument>
    ){}

    async addBook(createBookDto : CreateBookDto) : Promise<Book> {
        const book = {id : Date.now(), ...createBookDto};
        return new this.bookModel(book).save();
    }

    async findAll() : Promise<Book[]>{
        return this.bookModel.find().exec();
    }

    async findByName( name : string) : Promise<Book>{
        const book = this.bookModel.findOne({name : name});
        console.log("book");
        return book;
    }

    async findById( id : string) : Promise<Book>{
        return this.bookModel.findOne({id : id});
    }

    async update( createBookDto : CreateBookDto,id : string) : Promise<Book>{
        const book = {
            name : createBookDto.name,
            author : createBookDto.author,
            price : createBookDto.price
        };
        return this.bookModel.findOneAndUpdate({id : id}, book); 
    }

    async delete(id : string) {
        console.log(id);
        await this.bookModel.deleteOne({id:id});
    }
}
