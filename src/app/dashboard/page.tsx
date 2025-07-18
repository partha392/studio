import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { HealthTips } from "@/components/health-tips";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, AlertTriangle } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const overviewItems = [
    { title: "Patients Seen Today", value: "12", icon: Users },
    { title: "High-Risk Alerts", value: "3", icon: AlertTriangle, className: "text-destructive" },
    { title: "Recent Activity", value: "Triage response sent", icon: Activity },
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <PageHeader
            title="Dashboard"
            description="Welcome back, here's your overview for today."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {overviewItems.map(item => (
                <Card key={item.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                        <item.icon className={`h-4 w-4 text-muted-foreground ${item.className ?? ''}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{item.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
        <div className="grid grid-cols-1 gap-4">
             <HealthTips />
        </div>
        <div className="flex items-center justify-center pt-4">
          <Link href="/patients/new">
            <Button size="lg">
              Register New Patient
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
