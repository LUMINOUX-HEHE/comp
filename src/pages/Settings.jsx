import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Copy, RotateCcw } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Settings() {
  const [apiKey, setApiKey] = useState("competrack_live_8f3a29b1_demo");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API key copied to clipboard.");
  };

  const regenerateKey = () => {
    const randomPart = Math.random().toString(36).substring(2, 10);
    setApiKey(`competrack_live_${randomPart}_demo`);
    toast.success("New demo API key generated.");
  };

  return (
    <div className="max-w-4xl space-y-8">
       <div>
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground mt-1">Manage your account preferences and integrations.</p>
        </div>

        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First name</Label>
                            <Input id="firstName" placeholder="John" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input id="lastName" placeholder="Doe" defaultValue="Doe" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" defaultValue="john.doe@company.com" />
                    </div>
                    <div className="flex justify-end">
                        <Button>Save Changes</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you receive alerts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Email Alerts</Label>
                            <p className="text-sm text-muted-foreground">Receive daily digests of competitor activity.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Real-time Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Get notified immediately about high-impact events.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-primary/20 overflow-hidden">
                <CardHeader className="bg-primary/5 border-b border-primary/10">
                    <div className="flex items-center gap-2">
                        <CardTitle>API Configuration</CardTitle>
                    </div>
                    <CardDescription>Manage your API keys for external integrations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Production API Key</Label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Input 
                                    value={apiKey.replace(/(competrack_live_)(.{4})(.*)(_demo)/, "$1$2••••$4")} 
                                    readOnly 
                                    className="font-mono bg-muted/50 pr-10 border-primary/20 focus-visible:ring-primary/30" 
                                />
                            </div>
                            <Button variant="outline" onClick={copyToClipboard} className="gap-2 hover:bg-primary/10 hover:text-primary border-primary/20">
                                <Copy className="w-4 h-4" /> Copy
                            </Button>
                        </div>
                        <p className="text-[13px] text-muted-foreground">
                            This is a demo key for the template. Replace with your own API key in your app.
                        </p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-medium">Regenerate Key</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                This will invalidate the current key immediately.
                            </p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="gap-2">
                                    <RotateCcw className="w-4 h-4" /> Regenerate Key
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently invalidate your current API key and any integrations using it will stop working until updated.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={regenerateKey} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                        Yes, regenerate key
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
