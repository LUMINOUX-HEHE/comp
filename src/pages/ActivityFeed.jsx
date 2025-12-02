import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CircleDollarSign, Zap, Megaphone, Briefcase } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';

export default function ActivityFeed() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        api.get('/activity').then(setActivities);
    }, []);

    const getIcon = (type) => {
        switch(type) {
            case 'pricing': return <CircleDollarSign className="w-5 h-5 text-green-500" />;
            case 'feature': return <Zap className="w-5 h-5 text-yellow-500" />;
            case 'marketing': return <Megaphone className="w-5 h-5 text-blue-500" />;
            case 'hiring': return <Briefcase className="w-5 h-5 text-purple-500" />;
            default: return <Zap className="w-5 h-5" />;
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Market Activity Feed</h2>
                <p className="text-muted-foreground mt-1">Real-time updates on competitor movements.</p>
            </div>

            <div className="relative border-l border-border/50 ml-4 space-y-8 pb-10">
                {activities.map((item, index) => (
                    <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="relative pl-8"
                    >
                        <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center shadow-sm z-10">
                            {getIcon(item.type)}
                        </div>
                        <Card className="border-border/50 hover:border-primary/30 transition-colors">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="rounded-md">{item.company}</Badge>
                                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{item.type}</span>
                                        </div>
                                        <CardTitle className="text-lg">{item.title}</CardTitle>
                                    </div>
                                    <span className="text-sm text-muted-foreground whitespace-nowrap">{item.date}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
