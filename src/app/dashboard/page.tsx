"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { customerRequests } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { BookCopy, Users, Hourglass } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export default function DashboardPage() {
  const { t, p } = useLanguage();
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tighter font-lexend">{t('adminDashboard')}</h1>
        <p className="text-muted-foreground mt-2">{t('adminDashboardSubtitle')}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('totalRequests')}
            </CardTitle>
            <BookCopy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              {t('fromAllCustomers')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unique Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{[...new Set(customerRequests.map(r => r.customerName))].length}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <Hourglass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerRequests.filter(r => r.status === 'Pending').length}</div>
            <p className="text-xs text-muted-foreground">
              Require fulfillment
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('customerRequests')}</CardTitle>
          <CardDescription>
            {t('customerRequestsSubtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('customer')}</TableHead>
                <TableHead>{t('product')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead className="text-right">{t('quantity')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    {request.customerName}
                  </TableCell>
                  <TableCell>{p(request, 'productName')}</TableCell>
                  <TableCell>
                    <Badge variant={request.status === 'Fulfilled' ? 'default' : request.status === 'Pending' ? 'secondary' : 'destructive'} >
                      {t(request.status.toLowerCase())}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell className="text-right">{request.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
