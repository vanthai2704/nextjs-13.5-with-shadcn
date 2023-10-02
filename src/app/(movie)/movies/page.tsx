import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Movies = async () => {
  const jsonData = await fetch(
    "https://65193f6b818c4e98ac6030e4.mockapi.io/movies"
  );

  const data = await jsonData.json();

  return (
    <div className="min-h-screen w-[800px] m-auto mt-10">
      <div className="flex flex-row items-center justify-between">
        <Label>
          <h5>Movies</h5>
        </Label>
        <Input className="w-[500px]" type="text" />
      </div>

      <div className="grid grid-cols-4 gap-8 mt-10">
        {data?.map((data: any, index: any) => {
          return (
            <div key={index} className="flex flex-col justify-start">
              <div className="h-[280px]">
                <Image
                  src={data?.thumbnail}
                  className="w-full max-h-[280px]"
                  width={data?.thumbnail_width ?? 100}
                  height={data?.thumbnail_height ?? 100}
                  alt="xxx"
                />
              </div>
              <p>{`${data?.title} - ${data?.year}`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
