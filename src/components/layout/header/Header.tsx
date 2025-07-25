"use client";
import SessionHeader from "./SessionHeader";
import { FaHeart, FaOpencart, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useCart from "../../hooks/useCart";
import { useState } from "react";
import Image from "next/image";
import DropHeader from "./DropHeader";
import { signOutAction } from "@/lib/action";
import { toast } from "sonner";

export default function Header({ guest }: { guest: Guest | null }) {
  const { cart } = useCart();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [load, setLoad] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!value) return;
    e.preventDefault();
    router.push(`/catalog?query=${value}`);
    setValue("");
  }
  const quantity = cart.length
    ? cart.map((x) => x.quantity).reduce((a, b) => a + b)
    : 0;

  console.log(quantity, cart);

  async function signOut() {
    try {
      setLoad(true);
      await signOutAction();
      setLoad(false);
    } catch (error) {
      setLoad(false);
      const err = error as Error;
      toast("Error signing out", {
        description: err.message,
        duration: 4000,
        closeButton: true,
      });
    }
  }

  if (!guest?.$id)
    return (
      <SessionHeader
        handleSubmit={handleSubmit}
        value={value}
        setValue={setValue}
      >
        <div className="flex items-center gap-8 text-sm font-light">
          <Link
            href="/cart"
            className="flex items-center flex-col relative gap-0.5"
          >
            {quantity > 0 ? (
              <div className="absolute bottom-[80%] z-50 left-[60%] size-3.5 rounded-full flex item-center  justify-center text-[11px] bg-[#edcf5d]">
                {quantity}
              </div>
            ) : (
              ""
            )}
            <div className="border-2 scale-[0.95] cursor-pointer flex items-center justify-center border-zinc-400 rounded-full p-[1.2px]">
              <div className="rounded-full text-[12px] bg-zinc-500 size-[26.5px] flex items-center justify-center text-white">
                <FaOpencart />
              </div>
            </div>
            <p className="text-xs">Cart</p>
          </Link>
          <div className="flex items-center flex-col gap-0.5">
            <div className="border-2 scale-[0.95] cursor-pointer flex items-center justify-center border-zinc-400 rounded-full p-[1.2px]">
              <div className="rounded-full text-[12px] bg-zinc-500 size-[26.5px] flex items-center justify-center text-white">
                <FaHeart />
              </div>
            </div>
            <p className="text-xs">Favorite</p>
          </div>
          <DropHeader>
            <div className="flex items-center flex-col ">
              <div className="border-2 scale-[0.95] cursor-pointer flex items-center justify-center border-zinc-400 rounded-full p-[1.2px]">
                <div className="rounded-full text-[12px] bg-zinc-500 size-[26.5px] flex items-center justify-center text-white">
                  <FaUser />
                </div>
              </div>
              <p className="text-xs">Profile</p>
            </div>
          </DropHeader>
        </div>
      </SessionHeader>
    );
  return (
    <SessionHeader
      handleSubmit={handleSubmit}
      value={value}
      setValue={setValue}
    >
      <div className="flex items-center gap-6 text-sm font-light">
        <Link
          href="/cart"
          className="flex items-center flex-col relative gap-0.5"
        >
          {quantity > 0 ? (
            <div className="absolute bottom-[80%] z-50 left-[60%] size-3.5 rounded-full flex item-center  justify-center text-[11px] bg-[#edcf5d]">
              {quantity}
            </div>
          ) : (
            ""
          )}
          <div className="border-2 scale-[0.95] cursor-pointer flex items-center justify-center border-zinc-400 rounded-full p-[1.2px]">
            <div className="rounded-full text-[12px] bg-zinc-500 size-[26.5px] flex items-center justify-center text-white">
              <FaOpencart />
            </div>
          </div>
          <p className="text-xs">Cart</p>
        </Link>
        <div className="flex items-center flex-col gap-0.5">
          <div className="border-2 scale-[0.95] cursor-pointer flex items-center justify-center border-zinc-400 rounded-full p-[1.2px]">
            <div className="rounded-full text-[12px] bg-zinc-500 size-[26.5px] flex items-center justify-center text-white">
              <FaHeart />
            </div>
          </div>
          <p className="text-xs">Favorite</p>
        </div>
        <DropHeader load={load} onClick={async () => await signOut()}>
          <div className="flex items-center flex-col ">
            {guest.image.length ? (
              <div className="border-2 cursor-pointer flex items-center justify-center border-zinc-400 rounded-full p-[1.2px]">
                <Image
                  src={guest.image}
                  alt="user-image"
                  className="object-center object-cover rounded-full"
                  width={25}
                  height={25}
                />
              </div>
            ) : (
              <div className="border-2 cursor-pointer flex items-center justify-center border-zinc-400 rounded-full p-[1.2px]">
                <div className="rounded-full bg-zinc-500 size-[30px] flex items-center justify-center text-white">
                  {guest.name.at(0)}
                </div>
              </div>
            )}
            <p className="text-xs">Profile</p>
          </div>
        </DropHeader>
      </div>
    </SessionHeader>
  );
}
