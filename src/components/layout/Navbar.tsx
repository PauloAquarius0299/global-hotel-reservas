'use client'

import { useAuth, UserButton } from "@clerk/nextjs"
import Container from "../Container"
import { FaEarthAmericas } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import {Button} from '@/components/ui/button';
import SearchInput from "../SearchInput";
import { ModeToggle } from "../theme-toggle";
import { NavMenu } from "./NavMenu";

const Navbar = () => {
  const router = useRouter()
  const {userId} = useAuth()

  return (
    <div className="sticky top-0 border border-b-primary/10 bg-secondary">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 cursor-pointer" onClick={()=> router.push('/')}>
          <FaEarthAmericas className="text-blue-800 text-2xl" />
          <span className="font-bold text-xl">GlobalHotel</span>
          </div>
          <SearchInput />
          <div className="flex gap-3 items-center">
            <div>
              <ModeToggle />
              <NavMenu />
            </div>
            <UserButton afterSignOutUrl="/" />
            {!userId && <>
            <Button onClick={()=> router.push('/sign-in')} variant='outline' size='sm' >Acessar</Button>
            <Button onClick={()=> router.push('/sign-up')} size='sm' >Cadastrar</Button>
            </>}
          </div>
        </div>
         
      </Container>
       
    </div>
  )
}

export default Navbar