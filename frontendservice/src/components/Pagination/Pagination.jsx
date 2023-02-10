import React from "react"
import "./Pagination.css"

const Pagination = () => {
    return (
        <><div className="flex justify-center mt-5">
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                    <li className="page-item disabled"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
                        href="#" tabIndex="-1" aria-disabled="true">Previous</a></li>
                    <li className="page-item"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">1</a></li>
                    <li className="page-item active"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                        href="#">2 <span className="visually-hidden"></span></a></li>
                    <li className="page-item"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">3</a></li>
                    <li className="page-item"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">4</a></li>
                    <li className="page-item"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">5</a></li>
                    <li className="page-item"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">6</a></li>
                    <li className="page-item"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">7</a></li>
                    <li className="page-item"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">8</a></li>
                    <li className="page-item"><a
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href="#">Next</a></li>
                </ul>
            </nav>
        </div>
        </>
    )
}

export default Pagination
