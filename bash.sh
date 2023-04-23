#!/usr/bin/bash
npx nx run accounts:serve:production
npx nx run transactions:serve:production
npx nx run authentication:serve:production
