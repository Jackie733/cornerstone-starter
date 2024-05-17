import { Button } from '@/components/ui/button';
import { User, Bell, Settings, Import, Camera, Text, Info } from 'lucide-react';

export default function Viewer() {
  return (
    <div key="1" className="flex flex-col h-screen">
      <header className="flex items-center justify-between h-14 px-4 border-b border-gray-700 w-full">
        <div className="text-white">Login & Title</div>
        <div className="flex space-x-2">
          <Button className="text-white" variant="ghost">
            <Import />
          </Button>
          <Button className="text-white" variant="ghost">
            <Camera />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="text-white" variant="ghost">
            <Bell />
          </Button>
          <Button className="text-white" variant="ghost">
            <User />
          </Button>
          <Button className="text-white" variant="ghost">
            <Settings />
          </Button>
        </div>
      </header>
      <main className="flex-1 flex">
        <aside className="w-64 flex flex-col border-r border-gray-700 transition-all duration-300 ease-in-out [&.collapsed]:w-16">
          <div className="flex flex-col space-y-2 p-4">
            <Button className="justify-start text-white gap-1" variant="ghost">
              <Text />
              <span className="transition-opacity duration-300 ease-in-out [&.collapsed]:opacity-0">
                Search
              </span>
            </Button>
            <Button className="justify-start text-white gap-1" variant="ghost">
              <Info />
              <span className="transition-opacity duration-300 ease-in-out [&.collapsed]:opacity-0">
                Settings
              </span>
            </Button>
          </div>
        </aside>
        <div className="flex-1 flex justify-center items-center"></div>
      </main>
    </div>
  );
}
