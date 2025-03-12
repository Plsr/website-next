import { GetStaticPropsContext } from 'next'
import { Book, getBooks } from '../../lib/books'

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const books = await getBooks()
  console.log(books)
  return { props: { books } }
}

// export async function getStaticPaths() {
//   return {
//     // Opt-in to on-demand generation for non-existent pages
//     fallback: false,
//     paths: [],
//   }
// }

type BooksProps = {
  books: Book[]
}

export const Books = ({ books }: BooksProps) => {
  return (
    <div>
      {books.map((book) => (
        <div key={book.title}>
          <p>{book.title}</p>
          {book.notes && <p dangerouslySetInnerHTML={{ __html: book.notes }} />}
        </div>
      ))}
    </div>
  )
}

export default Books
