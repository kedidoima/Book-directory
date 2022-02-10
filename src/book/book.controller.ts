import { Body, Controller, Get , Post, Request} from '@nestjs/common';
import console from 'console';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/createBook.dto';
import { Book } from './schema/book.schema';

@Controller('book')
export class BookController {
    constructor (
        private bookService : BookService
    ){}

    @Get('')
    async findAll() : Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Get(':id')
    async findById(@Request() req) :Promise<Book>{
        return this.bookService.findById(req.params.id);
    }

    @Get('searchBook')
    async findByName(@Body() body): Promise<Book> {
        console.log(body);
        return this.bookService.findByName(body.name);
    }

    @Post('addBook')
    async addBook(@Body() body : CreateBookDto) :Promise<Book>{
        return this.bookService.addBook(body);
    }

    @Post('update/:id')
    async update(@Request() req,@Body() body : CreateBookDto) : Promise<Book>{
        return this.bookService.update(body,req.params.id);
    }

    @Get('delete/:id')
    async datele(@Request() req){
        this.bookService.delete(req.params.id);
    }
}
