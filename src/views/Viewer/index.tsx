import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Bell, Import, Camera, Text, Info } from 'lucide-react';
import { loadUserPromptedFile } from '@/actions/loadUserFiles';

export default function Viewer() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div key="1" className="flex flex-col h-screen">
      <header className="flex items-center justify-between h-12 px-4 border-b border-gray-700 w-full">
        <div className="text-white">Login & Title</div>
        <div className="flex space-x-2">
          <Button size="icon" variant="ghost" onClick={loadUserPromptedFile}>
            <Import />
            <span className="sr-only">Import</span>
          </Button>
          <Button size="icon" variant="ghost">
            <Camera />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              toast({
                title: 'Test',
                description: 'Hello world',
              });
            }}
          >
            <Bell />
            <span className="sr-only">Messages</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
