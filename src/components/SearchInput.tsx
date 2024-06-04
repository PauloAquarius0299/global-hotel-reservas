'use client'

import { Input } from "./ui/input"
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  return (
    <div className="relative sm:block hidden">
        <CiSearch className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
        <Input placeholder="Pesquisar..." className="pl-10 bg-primary/10"/>
    </div>
  )
}

export default SearchInput