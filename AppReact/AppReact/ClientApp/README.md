1.You need to create new DB "DBTEST" in MSSQL server:

2.Create new Table "CustomerInvoices":

USE [DBTEST]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CustomerInvoices](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Date] [date] NULL,
	[Status] [nvarchar](150) NULL,
	[Amount] [int] NULL
) ON [PRIMARY]
GO

3.Run the application.

