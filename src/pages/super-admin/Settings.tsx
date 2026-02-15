import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground">Configure platform settings</p>
      </div>
      <div className="rounded-xl border bg-card card-shadow p-12 flex flex-col items-center justify-center text-center">
        <div className="rounded-xl bg-primary/10 p-4 mb-4">
          <Settings className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-display font-semibold text-foreground text-lg">System Settings</h3>
        <p className="text-muted-foreground mt-1 max-w-md">
          Platform configuration, notification settings, and system preferences will be available here.
        </p>
      </div>
    </div>
  );
}
