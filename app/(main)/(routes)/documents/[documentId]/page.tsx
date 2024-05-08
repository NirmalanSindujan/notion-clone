"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"


interface DocumentIdPageInterface {
    params : {
        documentId : Id<"documents">
    }
}

const DocumentIdPage = ({
    params
} : DocumentIdPageInterface) =>{

    const document = useQuery(api.documents.getById,{
        documentId : params.documentId
    })

    if(document === undefined){
        <div>
            Loading...
        </div>
    }
    return(
        <div>
            Page
        </div>
    )
}

export default DocumentIdPage

