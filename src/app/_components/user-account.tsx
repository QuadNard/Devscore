"use client";

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import type { User } from 'next-auth';
import UserAvatar from './user-avatar';

type Props = {
    user: Pick<User, "name" | "image" | "email">;
}

const UserAccountNav = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
      <UserAvatar
          className="w-10 h-10"
          user={{
            name: user.name ?? null,
            image: user.image ?? null,
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white' align='end'>
          <div className='flex items-center justify-start gap-2 p-2'>
              {user.name && <p className='font-medium'>{user.name}</p>}
              {user.email && (<p className='w-[200px] truncate text-sm text-zinc-700'>{user.email}</p>)}
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
              <Link href=''>Meow</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signOut().catch(console.error);
          }}
          className="text-red-600 cursor-pointer"
        >
          Sign out
          <LogOut className="w-4 h-4 ml-2 " />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav