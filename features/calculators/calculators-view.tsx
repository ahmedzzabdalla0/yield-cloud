'use client';

import { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { CalculatorTabs } from '@/components/common/calculator-tabs';
import { Header } from '@/components/common/header';

export function CalculatorsView() {
  const [activeTab, setActiveTab] = useState('yield-calculator');

  return (
    <>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="border-border/60 bg-background/90 sticky top-16 z-30 border-b px-4 py-2 backdrop-blur-sm lg:hidden">
        <CalculatorTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsContent value="yield-calculator">
          <div />
        </TabsContent>
        <TabsContent value="capital-calculator">
          <div />
        </TabsContent>
        <TabsContent value="goal-calculator">
          <div />
        </TabsContent>
      </Tabs>
    </>
  );
}
