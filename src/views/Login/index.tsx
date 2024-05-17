import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Login() {
  return (
    <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-gray-100 lg:block dark:bg-gray-800">
        <img
          alt="Image"
          className="h-full w-full object-cover"
          height="1080"
          src="/nasa-earth.jpg"
          style={{
            aspectRatio: '1920/1080',
            objectFit: 'cover',
          }}
          width="1920"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign in with Google</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Sign in to your account to continue
            </p>
          </div>
          <div className="space-y-4">
            <Button className="w-full" variant="outline">
              <ChromeIcon className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" required type="password" />
            </div>
            <Button className="w-full" type="submit">
              Sign In
            </Button>
            <div className="mt-4 text-center text-sm">
              Don't have an account?
              <a className="underline" href="#">
                Sign up
              </a>{' '}
              or{' '}
              <a className="underline" href="#">
                reset password
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChromeIcon(props: Record<string, unknown>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
