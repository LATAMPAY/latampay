-- Crear tabla de cuentas
CREATE TABLE IF NOT EXISTS public.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  account_number TEXT UNIQUE NOT NULL,
  balance FLOAT DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de transacciones
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount FLOAT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('deposit', 'withdrawal', 'transfer', 'payment', 'investment', 'loan_payment')),
  status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  account_id UUID REFERENCES public.accounts(id),
  user_id UUID REFERENCES public.users(id),
  sender_user_id UUID REFERENCES public.users(id),
  sender_account_id UUID REFERENCES public.accounts(id),
  receiver_account_id UUID REFERENCES public.accounts(id),
  fee FLOAT DEFAULT 0,
  reference TEXT
);

-- Crear tabla de tarjetas
CREATE TABLE IF NOT EXISTS public.cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID REFERENCES public.accounts(id),
  user_id UUID REFERENCES public.users(id),
  card_number TEXT UNIQUE NOT NULL,
  cardholder_name TEXT NOT NULL,
  expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
  cvv TEXT NOT NULL,
  type TEXT CHECK (type IN ('debit', 'credit')),
  status TEXT CHECK (status IN ('active', 'inactive', 'blocked')) DEFAULT 'active',
  credit_limit FLOAT,
  available_credit FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de inversiones
CREATE TABLE IF NOT EXISTS public.investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  amount FLOAT NOT NULL,
  current_value FLOAT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  term INTEGER,
  interest_rate FLOAT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de préstamos
CREATE TABLE IF NOT EXISTS public.loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  amount FLOAT NOT NULL,
  remaining_amount FLOAT NOT NULL,
  interest_rate FLOAT NOT NULL,
  term_months INTEGER NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de alertas de riesgo
CREATE TABLE IF NOT EXISTS public.risk_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high')),
  status TEXT CHECK (status IN ('open', 'in_investigation', 'closed')) DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Habilitar RLS en todas las tablas
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_alerts ENABLE ROW LEVEL SECURITY;

-- Crear políticas RLS
-- Accounts
CREATE POLICY "Users can view their own accounts" 
  ON public.accounts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own accounts" 
  ON public.accounts 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Transactions
CREATE POLICY "Users can view their own transactions" 
  ON public.transactions 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Cards
CREATE POLICY "Users can view their own cards" 
  ON public.cards 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own cards" 
  ON public.cards 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Investments
CREATE POLICY "Users can view their own investments" 
  ON public.investments 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Loans
CREATE POLICY "Users can view their own loans" 
  ON public.loans 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Risk Alerts
CREATE POLICY "Users can view their own risk alerts" 
  ON public.risk_alerts 
  FOR SELECT 
  USING (auth.uid() = user_id);

