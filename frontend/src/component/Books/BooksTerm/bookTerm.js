import React from "react";
import {Link} from "react-router-dom";

const BookTerm = (props) => {
    return (
        <tr>
            <td>{props.term.name}</td>
            <td>{props.term.author.name}</td>
            <td>{props.term.author.surname}</td>
            <td>{props.term.category}</td>
            <td>{props.term.availableCopies}</td>
            <td>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
               <a className={"btn btn-success"} onClick={() => props.rentBook(props.term.id)}>Rent book</a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
               <a className={"btn btn-success ml-2"} onClick={() => props.returnBook(props.term.id)}>Return book</a>
            </td>
            <td className={"text-right"}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a title={"Delete"} className={"btn btn-danger"}
                   onClick={() => props.onDelete(props.term.id)}>Delete
                </a>
                <Link className={"btn btn-info ml-2"} onClick={() => props.onEdit(props.term.id)}
                      to={`/books/edit/${props.term.id}`}>
                    Edit
                </Link>
            </td>
        </tr>
    );
}

export default BookTerm;