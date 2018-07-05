import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

class Book {
  constructor(public title) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  title = 'app';

  public books: FirebaseListObservable<Book[]>;
  private bookCounter = 0;
  private filter = '';
  private allBooks: any;
  booksSec: any;
  booksSecFilter: any;

  constructor(db: AngularFireDatabase) {
      this.booksSec = db.list('/books');
      this.booksSecFilter = db.list('/books',ref => ref.orderByChild('title').equalTo('My book #1'));
      this.ShowBook();
  }

  public addBook(): void {
    let newBook = new Book(`My book #${this.bookCounter++}`);
    this.booksSec.push(newBook);
  }

  public filterBooks(): void {
    this.booksSecFilter.valueChanges().subscribe((snaps) => {
        this.allBooks = snaps;
        console.log(this.allBooks);
      });
  }

  public ShowBook(): void {
      this.booksSec.valueChanges().subscribe((snaps) => {
        console.log(snaps);
        this.allBooks = snaps;
      });
  }
}
