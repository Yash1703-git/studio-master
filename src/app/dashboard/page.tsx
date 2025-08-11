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
import { useLanguage } from "@/context/language-context";

export default function DashboardPage() {
  const { t, p } = useLanguage();
  return (
    <div className="container mx-auto p-4">
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
                <TableHead>{t('quantity')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('date')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.customerName}</TableCell>
                  <TableCell>{p(request, 'productName')}</TableCell>
                  <TableCell>{request.quantity}</TableCell>
                  <TableCell>
                    <Badge variant={request.status === 'Fulfilled' ? 'default' : request.status === 'Pending' ? 'secondary' : 'destructive'} >
                      {t(request.status.toLowerCase())}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
