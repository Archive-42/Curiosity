class Invoice:
    def __init__(self, number):
        self._number = number
        self._items = []

    def add_item(self, item):
        self._items.append(item)

    @property
    def total(self):
        # t = 0
        # for item in self._items:
        #     t = item.total()
        totals = [item.total for item in self._items]
        return sum(totals)

    @property
    def number(self):
        return self._number

    @number.setter
    def number(self, value):
        if value is not None:
            self._number = value

    def __repr__(self):
        return f'<Invoice {self._number} ${self.total}>'


class LineItem:
    def __init__(self, amount, description):
        self._amount = amount
        self._description = description


class FeeItem(LineItem):
    def __init__(self, rate, amount, description):
        super().__init__(amount, description)
        self._rate = rate

    @property
    def total(self):
        return self._rate * self._amount


class ExpenseItem(LineItem):
    def __init__(self, amount, description):
        super().__init__(amount, description)

    @property
    def total(self):
        return self._amount


invoice = Invoice('A12345')
fee = FeeItem(100, 1.5, 'Phone Conversation')
expense = ExpenseItem(200, 'Copies')

invoice.add_item(fee)
invoice.add_item(expense)

print(invoice.number)
invoice.number = 'B23456'
print(invoice.number)

# print(invoice.total, fee.total, expense.total)
